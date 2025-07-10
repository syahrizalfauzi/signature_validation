package handler

import (
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type GenerateRequest struct {
	RequestBody any    `json:"requestBody"`
	Client      string `json:"client"`
}

type GenerateResponse struct {
	Nonce     string `json:"nonce"`
	Signature string `json:"signature"`
}

func Generate(c *gin.Context) {
	var req GenerateRequest
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
	nonce := uuid.New().String()

	signature := HashSHA256(string(requestString) + nonce + clientKey)

	c.JSON(200, GenerateResponse{
		Nonce:     nonce,
		Signature: signature,
	})

}
