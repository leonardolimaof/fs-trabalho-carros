document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário de enviar

    const carro = document.getElementById('carro').value;
    const ano = document.getElementById('ano').value;

    document.getElementById('carro').value = "";
    document.getElementById('ano').value = "";

    const data = {
        carro: carro,
        ano: ano
    };

    fetch('http://localhost:3000/Veiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados enviados com sucesso:', data);
        Swal.fire({
            title: "Salvo com sucesso!",
            text: "Dê um ok!",
            icon: "success"
          });
        
        // Fecha o modal após a inserção dos dados
        $('#modalEditar').modal('hide');

        // Recarrega a lista de veículos
        // Substitua esta linha pela função que recarrega a lista de veículos no seu contexto
        // Por exemplo, se você estiver usando Vue.js, pode chamar um método para recarregar a lista de veículos
        // Se você estiver usando uma biblioteca de manipulação do DOM, pode atualizar a lista diretamente
        // Se precisar de ajuda com isso, por favor, me avise
        // Por enquanto, vamos apenas recarregar a página inteira
        window.location.reload();
    })
    .catch((error) => {
        console.error('Erro ao enviar dados:', error);
    });
});
        


            // tabela
            fetch('db.json')
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('resposta');

        data.Veiculos.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.carro}</td>
                <td>${item.ano}</td>
                <td>
                    <button class="btn btn-primary" href="#" data-toggle="modal" data-target="#modalEditar_${item.id}" onclick="editar('${item.id}')">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <div class="modal fade" id="modalEditar_${item.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Editar Veículos</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container text-center">
                                    <p>Veiculo de ID: ${item.id}</p>
                                        <div class="row text-center justify-content-center m-3">
                                            <form id="form_${item.id}">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="carro_${item.id}" name="carro" placeholder="Nome do carro">
                                                </div>
                                                <div class="form-group">
                                                    <input type="number" class="form-control" id="ano_${item.id}" name="ano" placeholder="Ano de fabricação">
                                                </div>
                                                <button type="button" class="btn btn-primary m-3" onclick="atualizar('${item.id}')"><i class="bi bi-arrow-down-up"></i> Atualizar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="bi bi-x-lg"></i> Fechar</button>
                                    <button class="btn btn-danger" onclick="deletar('${item.id}')"><i class="bi bi-trash"></i> Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));



            function deletar(id) {
                fetch(`http://localhost:3000/Veiculos/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Dados deletados com sucesso:', data);
                    location.reload();
                })
                .catch(error => console.error('Erro ao deletar o JSON:', error));
            }

          
            
            function editar(id, carro, ano) {
                document.getElementById(`carro`).value = carro;
                document.getElementById(`ano`).value = ano;
            }

            function atualizar(id) {
                const carro = document.getElementById(`carro_${id}`).value
                const ano = document.getElementById(`ano_${id}`).value

                fetch(`http://localhost:3000/Veiculos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({carro: carro, ano: ano}),
                })

                .then(response => {
                    if (!response.ok) {
                        throw new Error('Não foi possível atualizar o JSON');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados atualizados com sucesso:', data);
                    location.reload();
                })
                .catch(error => console.error('Erro ao atualizar o JSON:', error));
            }
