from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User

# Unit Tests for Login
class UserLoginViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password
        )

    def test_user_login_successful(self):
        # Send a POST request to the login endpoint with valid credentials
        response = self.client.post(
            '/user/api/login/',
            {
                'username': self.username,
                'password': self.password
            },
            format='json'
        )
        
        # Check that the response has a status code of 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the response contains an 'access' token (or your token field name)
        self.assertIn('token', response.data)
        
    def test_user_login_invalid_credentials(self):
        # Send a POST request to the login endpoint with invalid credentials
        response = self.client.post(
            '/user/api/login/',
            {
                'username': 'invalid_username',
                'password': 'invalid_password'
            },
            format='json'
        )
        
        # Check that the response has a status code of 401 (Unauthorized)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
