import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YugiohCardList = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Função para buscar cartas da API
    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${(page - 1) * 20}`);
            if (response.data.data.length > 0) {
                setCards((prevCards) => [...prevCards, ...response.data.data]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Erro ao buscar cartas:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    // Função para detectar scroll até o final da página
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && hasMore && !loading) {
            fetchCards();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="rounded shadow-md border border-stone-950 p-4">
                        <img src={card.card_images[0].image_url} alt={card.name} className="w-full object-cover mb-4" />
                        <h2 className="text-xl font-semibold text-white">{card.name}</h2>
                        <p className="text-white">{card.type}</p>
                    </div>
                ))}
            </div>

            {loading && <p className="text-center text-gray-600 mt-4">Carregando mais cartas...</p>}
            {!hasMore && <p className="text-center text-gray-600 mt-4">Você chegou ao fim do databook.</p>}
        </div>
    );
};

export default YugiohCardList