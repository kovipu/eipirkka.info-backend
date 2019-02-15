# eipirkka.info-backend
Backend for eipirkka.info 🍻

## Development

To test the backend with curl

```bash
curl \
  -F "filecomment=This is an image." \
  -F "image=@./testdata/test_image.jpg" \
  localhost:3001/image
```
