import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useState } from 'react';
import { useRouter } from 'next/router'

function Titulo(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx >{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 48px;
                font-weight: 600;
            }`}</style>
    </>
  )
}

export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    followers: '',
    following: '',
    bio: '',
    location: '',
  })
  const roteamento = useRouter();

  async function getUserData(valor) {
    fetch(await `https://api.github.com/users/${valor}`)
      .then(async res => await res.json())
      .then((data) => setUserData(data))
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[400],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/organized-server-room-1536x864.jpeg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              roteamento.push(`/chat?username=${username}`);
              // window.location.href = '/chat'; modo do navegador p/ trocar pagina
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
             placeholder='Digite seu usuário do Github...'
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
                getUserData(valor)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '300px',
                margin: '16px',
                padding: '16px',
                border: ' 1px solid',
                borderColor: appConfig.theme.colors.primary[700],
                borderRadius: '10px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
              }}>
              <Text variant="body3" styleSheet={{ fontFamily: 'Inter', color: '#a0aec0' }}>
                {userData.bio}
              </Text>
              <Text variant="body3" styleSheet={{ fontFamily: 'Inter', color: '#a0aec0' }}>
                Nome: {userData.name}
              </Text>
              <Text variant="body3" styleSheet={{ fontFamily: 'Inter', color: '#a0aec0' }}>
                Localização: {userData.location}
              </Text>
              <Text variant="body3" styleSheet={{ fontFamily: 'Inter', color: '#a0aec0' }}>
                Seguidores: {userData.followers}
              </Text>
              <Text variant="body3" styleSheet={{ fontFamily: 'Inter', color: '#a0aec0' }}>
                Seguindo: {userData.following}
              </Text>

            </Box>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '300px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary[700],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
            </Text>{username}

          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
