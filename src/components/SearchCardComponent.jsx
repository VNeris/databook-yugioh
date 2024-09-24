import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCardComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cardType, setCardType] = useState('');
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    const cardTypes = [
        { label: 'Monstro de Efeito', value: 'Effect Monster' },
        { label: 'Monstro Normal', value: 'Normal Monster' },
        { label: 'Armadilha', value: 'Trap Card' },
        { label: 'Magia', value: 'Spell Card' },
        { label: 'Monstro Synchro', value: 'Synchro Monster' },
        { label: 'Monstro XYZ', value: 'XYZ Monster' },
        { label: 'Monstro Fusão', value: 'Fusion Monster' },
        { label: 'Monstro de Ritual', value: 'Ritual Monster' },
        { label: 'Monstro Pêndulo', value: 'Pendulum Monster' },
        { label: 'Link Monster', value: 'Link Monster' },
    ];

    // Função para buscar cartas com base no termo de busca e tipo de carta
    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${cardType}&fname=${searchTerm}`);
            setCards(response.data.data || []);
        } catch (error) {
            console.error('Erro ao buscar cartas:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (cardType) {
            fetchCards();
        }
    }, [cardType, searchTerm]);

    return (
        <div className="container mx-auto mt-10 p-4">

            {/* Campo de busca */}
            <div className="flex flex-col text-black md:flex-row justify-center items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Digite o nome da carta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg p-2 w-full md:w-1/3"
                />

                {/* Dropdown para selecionar o tipo de carta */}
                <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
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
            {loading && <p className="text-center text-gray-600">Carregando cartas...</p>}

            {/* Grid de cartas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="rounded shadow-md border border-stone-950 p-4">
                        <img src={card.card_images[0].image_url} alt={card.name} className="w-full object-cover mb-4" />
                        <h2 className="text-xl font-semibold text-white">{card.name}</h2>
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

export default SearchCardComponent;
