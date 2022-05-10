import React from "react";
import VideoListItem from ".";
import video from './sampleData.json'

export default { title: 'organisms/VideoListItem' }

export const videoListItem = () => <VideoListItem video={video} />
