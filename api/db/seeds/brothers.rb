module Seeds
  class Brothers
    def create
      brother_list.each do |brother|
        next if Brother.where(name: brother[0]).exists?

        Brother.create(
          name: brother[0],
          avatar: brother[1],
          gshow_url: brother[2],
          status: brother[3]
        )
      end
    end

    private

    def brother_list
      [
        ['Arthur Aguiar ', '/brothers/arthur-aguiar-header.png', 'http://gshow.globo.com/artistas/arthur-aguiar', 'regular'],
        ['Bárbara ', '/brothers/barbara-header.png', 'http://gshow.globo.com/artistas/barbara-bbb22', 'out'],
        ['Brunna Gonçalves', '/brothers/bruna-goncalves-header.png', 'http://gshow.globo.com/artistas/brunna-goncalves-bbb22', 'out'],
        ['Douglas Silva', '/brothers/douglas-silva-header.png', 'http://gshow.globo.com/artistas/douglas-silva', 'regular'],
        ['Eliezer', '/brothers/eliezer-header.png', 'http://gshow.globo.com/artistas/eliezer-bbb22', 'regular'],
        ['Eslovênia', '/brothers/eslovenia-header.png', 'http://gshow.globo.com/artistas/eslovenia-bbb22', 'regular'],
        ['Gustavo', '/brothers/gustavo-header.png', 'http://gshow.globo.com/artistas/gustavo-bbb22', 'regular'],
        ['Jade Picon', '/brothers/jade-picon-header.png', 'http://gshow.globo.com/artistas/jade-picon-bbb22', 'out'],
        ['Jessilane', '/brothers/jessilane-header.png', 'http://gshow.globo.com/artistas/jessilane-bbb22', 'regular'],
        ['Laís', '/brothers/lais-header.png', 'http://gshow.globo.com/artistas/lais-bbb22', 'regular'],
        ['Larissa', '/brothers/larissa-header.png', 'http://gshow.globo.com/artistas/larissa-bbb22', 'out'],
        ['Linn da Quebrada ', '/brothers/linn-da-quebrada-header.png', 'http://gshow.globo.com/artistas/linn-da-quebrada', 'regular'],
        ['Lucas', '/brothers/lucas-header.png', 'http://gshow.globo.com/artistas/lucas-bbb22', 'regular'],
        ['Luciano', '/brothers/luciano-header.png', 'http://gshow.globo.com/artistas/luciano-bbb22', 'out'],
        ['Maria', '/brothers/maria-header.png', 'http://gshow.globo.com/artistas/eu-maria', 'out'],
        ['Naiara Azevedo', '/brothers/naiara-azevedo-header.png', 'http://gshow.globo.com/artistas/naiara-azevedo', 'out'],
        ['Natália', '/brothers/natalia-header.png', 'http://gshow.globo.com/artistas/natalia-bbb22', 'regular'],
        ['Paulo André', '/brothers/paulo-andre-camilo-header.png', 'http://gshow.globo.com/artistas/paulo-andre-camilo-bbb22', 'regular'],
        ['Pedro Scooby', '/brothers/pedro-scooby-header.png', 'http://gshow.globo.com/artistas/pedro-scooby', 'regular'],
        ['Rodrigo', '/brothers/rodrigo-header.png', 'http://gshow.globo.com/artistas/rodrigo-bbb22', 'out'],
        ['Vinicius', '/brothers/vinicius-header.png', 'http://gshow.globo.com/artistas/vinicius-bbb22', 'out'],
      ]
    end
  end
end
