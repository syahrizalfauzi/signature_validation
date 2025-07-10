package handler

type Client struct {
	Name string
	Key  string
}

var Clients = []Client{
	{
		Name: "Client1",
		Key:  "Key1",
	},
}
