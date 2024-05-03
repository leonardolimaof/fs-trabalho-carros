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
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar o JSON:', error));
