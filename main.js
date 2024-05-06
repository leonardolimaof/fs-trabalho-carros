// main.js
document.getElementById('enviar').addEventListener('click', function() {
    const carro = document.getElementById('carro').value
    const ano = document.getElementById('ano').value

    document.getElementById('carro').value = "";
    document.getElementById('ano').value = "";

    let data = {
        carro: carro,
        ano: ano
    }

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
            })
            .catch((error) => {
                console.error('Erro ao enviar dados:', error);
            });
        });

        document.getElementById('enviar').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Cadastrado com sucesso!');
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
                        <button class="btn btn-primary" href="#" data-toggle="modal" data-target="#modalEditar" onclick="editar('${item.id}', '${item.carro}', '${item.ano}')"><i class="bi bi-pencil-square"></i> Editar</button>
                        <div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Editar Veiculos</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container text-center">
                                            <div class="row text-center justify-content-center m-3">
                                            <form action="/" method="PUT">
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="carro" name="carro" placeholder="Nome do carro">
                                                </div>
                                                <div class="form-group">
                                                    <input type="number" class="form-control" id="ano" name="ano" placeholder="Ano de fabricação">
                                                </div>
                                                <button id="atualizar" class="btn btn-primary m-3">Atualizar</button>
                                            </form>
                                            </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
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
                document.getElementById('carro').value = carro;
                document.getElementById('ano').value = ano;
            }

            
