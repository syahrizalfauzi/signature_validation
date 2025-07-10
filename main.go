package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/syahrizalfauzi/signature_validation/server/handler"
)

func main() {
	fmt.Println("Hello, World!")

	r := gin.Default()

	r.POST("/generate", handler.Generate)
	r.POST("/validate", handler.Validate)
	r.Run()
}
