document.getElementById('enviar').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário de enviar

    const carro = document.getElementById('carro').value;
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const ano = document.getElementById('ano').value;

    document.getElementById('carro').value = "";
    document.getElementById('modelo').value = "";
    document.getElementById('cor').value = "";
    document.getElementById('ano').value = "";

    const data = {
        carro: carro,
        modelo: modelo,
        cor: cor,
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
            position: "center",
            icon: "success",
            title: "Salvo com Sucesso!",
            showConfirmButton: false,
            timer: 1500
          })
          .then(() => {
            location.reload();
        });;
        
        // Fecha o modal após a inserção dos dados
        $('#modalEditar').modal('hide');

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
                <td>${item.modelo}</td>
                <td>${item.cor}</td>
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
                                        <p>Veículo de ID: ${item.id}</p>
                                        <form>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="carro_${item.id}" name="carro" value="${item.carro}" placeholder="Veículo" readonly>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" id="modelo_${item.id}" name="modelo" value="${item.modelo}" placeholder="Modelo">
                                            </div>
                                            <div class="form-group">
                                                <select class="form-control" id="cor_${item.id}" name="cor" value="${item.cor}">
                                                    <option value="" disabled selected>Selecione a cor</option>
                                                    <option value="Vermelho">Vermelho</option>
                                                    <option value="Azul">Azul</option>
                                                    <option value="Verde">Verde</option>
                                                    <option value="Amarelo">Amarelo</option>
                                                    <option value="Laranja">Laranja</option>
                                                    <option value="Roxo">Roxo</option>
                                                    <option value="Rosa">Rosa</option>
                                                    <option value="Marrom">Marrom</option>
                                                    <option value="Cinza">Cinza</option>
                                                    <option value="Branco">Branco</option>
                                                    <option value="Preto">Preto</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <input type="number" class="form-control" id="ano_${item.id}" name="ano" value="${item.ano}" placeholder="Ano de fabricação">
                                            </div>
                                            <button type="button" class="btn btn-primary m-3" onclick="atualizar('${item.id}')"><i class="bi bi-arrow-down-up"></i> Atualizar</button>
                                        </form>
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
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Deseja realmente deletar os dados?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/Veiculos/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Dados deletados com sucesso:', data);
                    Swal.fire({
                        title: 'Deletado com sucesso!',
                        text: 'Os dados foram deletados com sucesso.',
                        icon: 'success'
                    }).then(() => {
                        location.reload();
                    });
                })
                .catch(error => console.error('Erro ao deletar o JSON:', error));
            }
        });
    }
    
          
            
            function editar(id, carro, modelo, cor, ano) {
                document.getElementById(`carro`).value = carro;
                document.getElementById(`modelo`).value = modelo;
                document.getElementById(`cor`).value = cor;
                document.getElementById(`ano`).value = ano;
            }
            
            function atualizar(id) {
                const carro = document.getElementById(`carro_${id}`).value;
                const modelo = document.getElementById(`modelo_${id}`).value;
                const cor = document.getElementById(`cor_${id}`).value;
                const ano = document.getElementById(`ano_${id}`).value;
            
                Swal.fire({
                    title: 'Tem certeza?',
                    text: 'Deseja realmente atualizar os dados?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, atualizar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Chama a função editar para atualizar os campos de carro e ano
                        editar(id, carro, ano);
            
                        fetch(`http://localhost:3000/Veiculos/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ carro: carro, modelo: modelo, cor: cor, ano: ano }),
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Não foi possível atualizar o JSON');
                            }
                            return response.json();
                        })
                        .then(data => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Salvo com Sucesso!",
                                showConfirmButton: false,
                                timer: 1500
                              }).then(() => {
                                location.reload();
                              })
                        })
                        .catch(error => console.error('Erro ao atualizar o JSON:', error));
                    }
                });
            }
            
