// DataDisplay.js
import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px;
  background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%);
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  flex: 1 1 calc(25% - 40px);
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  padding: 30px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  color: #0288d1;
  margin-bottom: 20px;
`;

const Value = styled.p`
  font-size: 1.2em;
  color: #333;
`;

// Main component
export const DataDisplay = ({
  temperature = "N/A",
  humidity = "N/A",
  distance = "N/A",
  acceleration = { x: "N/A", y: "N/A", z: "N/A" },
  gyroscope = { x: "N/A", y: "N/A", z: "N/A" },
  orientation = { roll: "N/A", pitch: "N/A", yaw: "N/A" },
  gps = { latitude: "N/A", longitude: "N/A" },
}) => {
  return (
    <Container id="DataDisplay">
      <Box>
        <Title>Temperature</Title>
        <Value>{temperature} °C</Value>
      </Box>
      <Box>
        <Title>Humidity</Title>
        <Value>{humidity} %</Value>
      </Box>
      <Box>
        <Title>Distance</Title>
        <Value>{distance} cm</Value>
      </Box>
      <Box>
        <Title>Acceleration</Title>
        <Value>X: {acceleration.x} m/s² Y: {acceleration.y} m/s² Z: {acceleration.z} m/s²</Value>
      </Box>
      <Box>
        <Title>Gyroscope</Title>
        <Value>X: {gyroscope.x}° Y: {gyroscope.y}° Z: {gyroscope.z}°</Value>
      </Box>
      <Box>
        <Title>Orientation</Title>
        <Value>Roll: {orientation.roll}° Pitch: {orientation.pitch}° Yaw: {orientation.yaw}°</Value>
      </Box>
      <Box>
        <Title>GPS Location</Title>
        <Value>Lat: {gps.latitude} Long: {gps.longitude}</Value>
      </Box>
    </Container>
  );
};
