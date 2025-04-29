import React, { useState } from 'react';

function NewsArticle({article}) {
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const readArticle = (title, description) => {
        const text = `${title}. ${description}`;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';

        window.speechSynthesis.speak(speech);

        setIsReading(true);
    };

    const pauseSpeech = () => {
        window.speechSynthesis.pause();
        setIsPaused(true);
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsReading(false);
        setIsPaused(false);
    };

    const resumeSpeech = () => {
        window.speechSynthesis.resume();
        setIsPaused(false);
    }

    return (
        <div className="news-card">
            <h2 className="title">{article.title}</h2>
            {article.urlToImage && <img src={article.urlToImage} alt="Article" style={{width: '300px', height: 'auto'}} />}
            <p className="text">{article.description}</p>

            <div className="buttons">
                {!isReading ? (
                        <button className="read-aloud" onClick={() => readArticle(article.title, article.description)}>
                            Read Aloud
                            <i className="fa fa-volume-up"></i>
                        </button>
                ) : (
                    <div>
                        {isPaused ? (
                            <button onClick={resumeSpeech}>Resume</button>
                        ) : (
                            <button onClick={pauseSpeech}>Pause</button>
                        )}
                        <button onClick={stopSpeech}>Stop</button>
                    </div>
                )}

                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button>Read Full Article</button>
                </a>
            </div>
            {article.publishedAt && <p>Published At: {new Date(article.publishedAt).toLocaleString()}</p> }
        </div>
    );
}

export default NewsArticle;