import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfiniteScrollSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cardType, setCardType] = useState('');
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const cardTypes = [
        { label: 'Monstro de Efeito', value: 'Effect Monster' },
        { label: 'Monstro Normal', value: 'Normal Monster' },
        { label: 'Armadilha', value: 'Trap Card' },
        { label: 'Magia', value: 'Spell Card' },
        { label: 'Monstro Sincro', value: 'Synchro Monster' },
        { label: 'Monstro XYZ', value: 'XYZ Monster' },
        { label: 'Monstro Fusão', value: 'Fusion Monster' },
        { label: 'Monstro de Ritual', value: 'Ritual Monster' },
        { label: 'Link Monster', value: 'Link Monster' },
    ];

    // Função para buscar cartas com base no termo de busca, tipo de carta e número da página (para scroll infinito)
    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${cardType}&fname=${searchTerm}&num=20&offset=${(page - 1) * 20}`);
            if (response.data.data.length > 0) {
                setCards(prevCards => [...prevCards, ...response.data.data]);
                setHasMore(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, cardType, searchTerm]);

    // Função para detectar o scroll e carregar mais cartas
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <div className="container mx-auto p-4">

            {/* Campo de busca */}
            <div className="flex flex-col md:flex-row justify-center items-center text-black mt-20 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Digite o nome da carta..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCards([]); // Limpa as cartas anteriores quando há nova busca
                        setPage(1); // Reseta a página
                    }}
                    className="border rounded-lg p-2 w-full md:w-1/3"
                />

                {/* Dropdown para selecionar o tipo de carta */}
                <select
                    value={cardType}
                    onChange={(e) => {
                        setCardType(e.target.value);
                        setCards([]); // Limpa as cartas anteriores quando há nova seleção
                        setPage(1); // Reseta a página
                    }}
                    className="border rounded-lg p-2 w-full md:w-1/3"
                >
                    <option value="">Selecione o tipo de carta</option>
                    {cardTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mostra que está carregando */}
            {loading && <p className="text-center text-white">Carregando cartas...</p>}

            {/* Grid de cartas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="rounded-lg shadow-md border border-slate-950 p-4">
                        <img src={card.card_images[0].image_url} alt={card.name} className="w-full object-cover mb-4" />
                        <h2 className="text-xl font-bold text-white">{card.name}</h2>
                        <p className="text-white">{card.type}</p>
                    </div>
                ))}
            </div>

            {/* Mostra mensagem se não encontrar cartas */}
            {!loading && cards.length === 0 && (
                <p className="text-center text-gray-600">Nenhuma carta encontrada.</p>
            )}
        </div>
    );
};

export default InfiniteScrollSearch;
