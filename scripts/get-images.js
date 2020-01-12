const axios = require('axios');
const parser = require('fast-xml-parser');
const download = require('image-downloader');

const videos = [
  { id: 203651721, title: 'dusk-lighting' },
  { id: 220901286, title: 'ambulapse' },
  { id: 75742612, title: 'around-about' },
  { id: 220896967, title: 'two-verse-one-bridge' },
  { id: 204976964, title: 'have-your-cake' },
  { id: 203391407, title: 'move-in-early-2013' },
  { id: 202866843, title: 'cottage-view' },
  { id: 202692756, title: 'gone-by-gondola' },
  { id: 202689606, title: 'winter-watching-or-waiting' },
  { id: 202496838, title: 'bench' },
  { id: 202494138, title: '10-sunsets-5-minutes' },
  { id: 201903288, title: 'tate-straight-tall' },
  { id: 201896345, title: 'richmond-scroll' },
  { id: 201891776, title: 'forward' },
  { id: 380524979, title: 'after-mark-lewis' },
  { id: 380530156, title: 'scream' },
  { id: 380527668, title: 'queen-peter' },
  { id: 380527909, title: 'empty-intersection' },
  { id: 380527113, title: 'on-stone-and-puddle' },
  { id: 380639280, title: 'i-knew-it' },
  { id: 380638879, title: 'and-now' },
  { id: 380639106, title: 'downsview-finch' },
  { id: 380639805, title: 'two-walking' },
  { id: 380640203, title: 'i-did-it' },
  { id: 381684696, title: 'lakeside' },
  { id: 381685086, title: 'uh-yeah' },
  { id: 380639848, title: 'show-medium' },
];

for (let i=0,len=videos.length; i<len; i++) {
  const { id, title } = videos[i];
  const url = `http://vimeo.com/api/v2/video/${id}.xml`;
  console.log(url);

  axios.get(url).then(function (response) {
    const videoData = parser.parse(response.data);
    const imageUrl = videoData.videos.video.thumbnail_large.replace('_640', '');
    const filenameParts = imageUrl.split('.');
    const filename = `${title}.${filenameParts[filenameParts.length-1]}`;

    console.log(imageUrl);

    download.image({
      url: imageUrl,
      dest: __dirname + `/images/${filename}`
    })
      .then(({ filename, image }) => {
        console.log('Saved to', filename)  // Saved to /path/to/dest/image.jpg
      })
  });
}
