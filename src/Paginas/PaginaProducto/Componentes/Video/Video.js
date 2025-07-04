import { useState, useEffect } from 'react';

import './Video.css';

function Video({ producto }){
    const [videoSources, setVideoSources] = useState([]);
    const videos = producto?.video;

    useEffect(() => {
        if (videos && videos.length > 0) {
            const checkVideo = async () => {
                const newSources = await Promise.all(
                    videos.map(async (video) => {
                        try {
                            const response = await fetch(video.ruta, { method: 'HEAD' });
                            return response.ok ? video.ruta : null;
                        } catch (error) {
                            return null;
                        }
                    })
                );
                setVideoSources(newSources);
            };
            
            checkVideo();
        }
    }, [videos]);

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
        return null;
    }

    return(
        <div className="d-flex-column gap-10 product-video-container">
            {videos.map((video, index) => (
                <div key={index} className='w-100 d-flex-column'>
                    {videoSources[index] ? (
                        <video width="auto" height="auto" controls className='product-video'>
                            <source src={videoSources[index]} type="video/mp4" />
                        </video>
                    ) : (
                        <div style={{ color: 'red', padding: '10px' }}>
                            Video no encontrado en: {video.ruta}
                            <div>
                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                    Ver en TikTok
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Video;
