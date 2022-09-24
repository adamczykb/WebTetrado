# WebTetrado
Web service uses eltetrado backend docker image. It's needed to run service.

For frontend is needed to specify in src directory configuration file (config.json):
```json
{
  "SERVER_URL": "",           //for production leave empty
  "SERVER_WEB_SOCKET_URL": "",//fill with proper webSocket server service
  "FRONTEND_URL": ""          //for production leave empty
}
```

To build and run the service execute just one command:
```bash
docker-compose up --build
```
