import React, { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { socket } from '../configs/socket';

export default function CameraVerify() {
  const localVideoRef = useRef(null);
  const [peer, setPeer] = useState(null);

  useEffect(() => {

    socket.emit('join_room', 'admin_room');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(async stream => {
        localVideoRef.current.srcObject = stream;
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = e => {
          if (e.candidate) {
            socket.emit('ice-candidate', {
              roomId: 'admin_room',
              candidate: e.candidate,
            });
          }
        };

        socket.on('answer', async ({ answer }) => {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', async ({ candidate, studentId }) => {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error('Error adding remote ICE candidate:', err);
          }
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', {
          roomId: 'admin_room',
          offer
        });

        setPeer(pc);
      })
      .catch(err => console.error('Camera access error:', err));
  }, []);

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>Camera Verification</Text>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          maxHeight: '80vh',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
    </Box>
  );
}
