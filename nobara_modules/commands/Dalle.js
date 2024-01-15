const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "dalle3",
    version: "1.0",
    Credits: "Cock, Dipto | credit change korla bts💩🐤",
    countDown: 15,
    hasPermssion: 0,
    Description: "Generate images by Dalle3",
    category: "download",
  },

module.exports.run = async function ({ api, message, args , event }) {
    try {
      const p = args.join(" ");
  
      const w = await api.sendMessage("Please wait...", event.threadID);

      // const cookieString = await fs.readFile('dallekey.json', 'utf-8');
      // const cookie = JSON.parse(cookieString);

      const data2 = {
        prompt: p,
        cookie: cookie.dalle || "add your own cookie"
      };
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const response = await axios.post('https://project-dallee3.onrender.com/dalle', data2, config);
  
      if (response.status === 200) {
        const imageUrls = response.data.image_urls.filter(url => !url.endsWith('.svg'));
        const imgData = [];
  
        for (let i = 0; i < imageUrls.length; i++) {
          const imgResponse = await axios.get(imageUrls[i], { responseType: 'arraybuffer' });
          const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
          await fs.outputFile(imgPath, imgResponse.data);
          imgData.push(fs.createReadStream(imgPath));
        }
  
      //  await api.unsendMessage(w.messageID);
  
        await api.sendMessage({
          body: `✅ | Generated`,
          attachment: imgData
        },event.threadID);
      } else {
        throw new Error("Non-200 status code received");
      }
    } catch (error) {
      return api.sendMessage("Redirect failed! Most probably bad prompt.",event.threadID);
    }
  };
