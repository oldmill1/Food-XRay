#!/bin/bash

# scripts/test-openai-connection.sh
echo "Testing OpenAI API connection..."
echo "================================"

# Test with a simple "hi" message
response=$(curl -X POST http://localhost:5173/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "hi",
    "model": "gpt-4o"
  }' \
  -w "\nHTTP_STATUS:%{http_code}" \
  -s)

# Extract HTTP status code
http_code=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
response_body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "$response_body"
echo ""
echo "HTTP Status: $http_code"

echo "================================"

# Check if the request was successful
if [ "$http_code" = "200" ]; then
    echo "✅ SUCCESS: OpenAI API connection working!"
elif [ "$http_code" = "000" ]; then
    echo "❌ FAILED: Cannot connect to server. Is your dev server running on localhost:5173?"
elif [ "$http_code" = "500" ]; then
    echo "❌ FAILED: Server error. Check your OPENAI_API_KEY in .env file."
else
    echo "❌ FAILED: Unexpected error (HTTP $http_code)"
fi