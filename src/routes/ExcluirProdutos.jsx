import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ExcluirProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        id: id,
        nome: '',
        desc: '',
        preco: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/produtos/${id}`)
            .then((response) => response.json())
            .then((response) => setProduto(response))
            .catch(error => console.log(error));
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Tem certeza de que deseja excluir este produto?")) {
            fetch(`http://localhost:5000/produtos/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log("Produto excluído com sucesso.");
                        navigate("/produtos");
                    } else {
                        console.log("Erro ao excluir o produto.");
                    }
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div>
            <h1>EXCLUIR PRODUTO</h1>

            <div>
                <fieldset>
                    <legend>Produto Selecionado</legend>
                    <div>
                        <p><strong>Nome:</strong> {produto.nome}</p>
                    </div>
                    <div>
                        <p><strong>Descrição:</strong> {produto.desc}</p>
                    </div>
                    <div>
                        <p><strong>Valor:</strong> {produto.preco}</p>
                    </div>
                    <div>
                        <button onClick={handleDelete}>EXCLUIR</button>
                        <button onClick={() => navigate("/produtos")}>Cancelar</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}
