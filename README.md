# Pictok
A photo sharing app for visually impaired young adults (VIPs). VIPs will be able to take pictures, and AI will recognise objects in the picture, and will output an audio soundscape based on the objects in the image. 

## Motivation
Based on our research, we found out that teens with visual impairments want to engage with photos visually, similar to their sighted peers, but encounter limitations in photo sharing in current social media apps. 

Our team at PicTok found a way to incorporate the AI models, [`audiogen`](https://audiocraft.metademolab.com/audiogen.html) from Meta and [`gpt-4-Vision`](https://platform.openai.com/docs/guides/vision) from openAI to transform images into a rich auditory experience to enhance the photo sharing journey for the visually impaired.

## Features
- **AI Image Recognition**: Pictok uses [GPT-Vision](https://platform.openai.com/docs/guides/vision) to analyze images and generate detailed descriptions of the image. After we feed the description into Meta's [AudioGen](https://felixkreuk.github.io/audiogen/) which generates an auditory based on the provided description.
- **Accessible Gesture Navigation**: Users can navigate the app using simple swipe gestures to explore photos and interact with the interface.

## Usage
Visit our live web application at: https://pictok.vercel.app/
