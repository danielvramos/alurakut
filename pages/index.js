import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu,AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

function ProfileSidebar(propriedades) {
  
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr/>
      <p>
        <a className='boxlink' href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
function RelationsBox(props){
  return (
            <> 
              <h2 className="smallTitle">
               {props.title}
              </h2>

              <ul>
                {props.arrayFavoritos.slice(0,6).map((itemAtual) => {
                  return (
                    
                      <li key={itemAtual.id}>
                        <a href={`/users/${itemAtual.name}`} >
                          <img src={itemAtual.image} />
                          <span>{itemAtual.title}</span>
                        </a>
                     </li>
                  )
                })}
              </ul>
            </>
          )
}

export default function Home() {
  const usuarioAleatorio = 'danielvramos';
  const [comunidades, setComunidades] = React.useState([{
    id: new Date().toISOString(),
    name: 'eu odeio acordar cedo',
    image: 'https://w7.pngwing.com/pngs/969/123/png-transparent-garfield-minus-garfield-jon-arbuckle-odie-comics-good-night-miscellaneous-sleep-cartoon.png'
  }])

  const pessoas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'guilhermesilveira'
  ].map((itemAtual) =>{

    return (
     {id: new Date().toISOString()+itemAtual,
      name:itemAtual,
    image:'https://github.com/'+itemAtual+'.png'
    } 
    )
  })
return (
    <>    
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subtitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handlerCreateCommunity(e){
              e.preventDefault()
              
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id:new Date().toISOString(),
                title: dadosDoForm.get("title"),
                image: dadosDoForm.get("image")
              }

              const comunidadesAtual = [...comunidades,comunidade]

              setComunidades(comunidadesAtual)
            }}>
              <input type='text'
              placeholder='Qual vai ser o nome de sua comunidade?'
              aria-label='Qual vai ser o nome de sua comunidade?'
              name ="title"/>

              <input type='text'
              placeholder='informe URL para ser usada como capa'
              aria-label='informe URL para ser usada como capa'
              name ="image"/>

              <button>
                Salvar comunidade
              </button>               
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <RelationsBox arrayFavoritos={pessoas} title= {`Pessoas da comunidade ( ${pessoas.length} )`}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <RelationsBox arrayFavoritos={comunidades} title= {`Comunidades ( ${comunidades.length} )`}/>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
