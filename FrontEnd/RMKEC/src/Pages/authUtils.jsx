
import { Navigate } from 'react-router-dom';
export const getTokenData = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    // Parse the token string to retrieve the object
    const parsedToken = JSON.parse(token);
    console.log(parsedToken);
    return {
      id: parsedToken.id,
      role: parsedToken.role,
      department: parsedToken.department,
    };
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
};
