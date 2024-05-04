document.addEventListener('DOMContentLoaded', function() {
})


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
                        <button class="btn btn-primary btn-sm m-2" onclick="editar"><i class="bi bi-pencil-square"></i> Editar</button>
                      <button class="btn btn-danger btn-sm" onclick="deletar('${item.id}')"><i class="bi bi-trash"></i> Deletar</button>
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
