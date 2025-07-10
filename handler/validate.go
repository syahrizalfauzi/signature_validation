package handler

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
)

type ValidateRequest struct {
	RequestBody any    `json:"requestBody"`
	Nonce       string `json:"nonce"`
	Signature   string `json:"signature"`
	Client      string `json:"client"`
}

type ValidateResponse struct {
	Valid bool `json:"valid"`
}

func Validate(c *gin.Context) {
	var req ValidateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	// Get key from Clients
	var clientKey string
	for _, client := range Clients {
		if client.Name == req.Client {
			clientKey = client.Key
			break
		}
	}

	if clientKey == "" {
		c.JSON(400, gin.H{"error": "Client not found"})
		return
	}

	requestString, err := json.Marshal(req.RequestBody)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to marshal request body"})
		return
	}

	expectedSignature := HashSHA256(string(requestString) + req.Nonce + clientKey)
	valid := expectedSignature == req.Signature
	c.JSON(200, ValidateResponse{
		Valid: valid,
	})
}
