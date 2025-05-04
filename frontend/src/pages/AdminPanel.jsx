// src/pages/AdminPanel.jsx

import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { socket } from '../configs/socket';

export default function AdminPanel() {
  const [streamsMap, setStreamsMap] = useState({});

  useEffect(() => {
    socket.emit('join_room', 'admin_room');

    socket.on('offer', async ({ offer, studentId }) => {
      console.log('Offer from', studentId);

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setStreamsMap(prev => ({
          ...prev,
          [studentId]: remoteStream
        }));
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice-candidate', {
            roomId: 'admin_room',
            candidate: e.candidate,
            studentId
          });
        }
      };

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', {
        roomId: 'admin_room',
        answer,
        studentId
      });
    });

    socket.on('ice-candidate', async ({ candidate, studentId }) => {
      setStreamsMap(prev => {
        return prev;
      });
    });

    return () => {
      socket.off('offer');
      socket.off('ice-candidate');
    };
  }, []);

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>Live Student Camera Feeds</Text>
      <Box display="flex" flexWrap="wrap" gap={4}>
        {Object.entries(streamsMap).map(([studentId, stream]) => (
          <Box
            key={studentId}
            p={2}
            border="1px solid #ccc"
            borderRadius="md"
            textAlign="center"
          >
            <Text fontSize="sm" mb={2}>Student: {studentId}</Text>
            <video
              autoPlay
              playsInline
              ref={el => {
                if (el && !el.srcObject) {
                  el.srcObject = stream;
                }
              }}
              style={{
                width: 300,
                height: 200,
                borderRadius: 8,
                backgroundColor: 'black'
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
