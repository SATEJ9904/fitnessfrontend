import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #f7f9fc, #e8ebf0)',
  padding: '2rem',
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
});

const StyledBox = styled(Box)({
  width: '100%',
  maxWidth: '600px',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

function GooseAIPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const apiKey = 'sk-Bftl3ZlRrDYIUpnHUpc4bKm6hqfAddDk5QS3VEfL94hYEYcg'; // Replace with your actual API key
      const result = await axios.post(
        'https://api.goose.ai/v1/engines/gpt-neo-20b/completions',
        {
          prompt: prompt,
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(result.data.choices[0].text);
    } catch (error) {
      setResponse('An error occurred while fetching the response.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledBox>
        <Typography variant="h4" component="h1" gutterBottom>
          GooseAI Prompt Interface
        </Typography>
        <TextField
          label="Enter your prompt"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ marginTop: '1rem' }}
        />
        <StyledButton
          variant="contained"
          onClick={handlePromptSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </StyledButton>
        {response && (
          <Box
            sx={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#f4f6f8',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body1">{response}</Typography>
          </Box>
        )}
      </StyledBox>
    </StyledContainer>
  );
}

export default GooseAIPage;
