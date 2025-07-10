package handler

import (
	"crypto/sha256"
	"encoding/hex"
)

// HashSHA256, helper to hash SHA256
func HashSHA256(text string) string {
	hasher := sha256.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}
