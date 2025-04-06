import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

// 히어로 섹션 스타일
const HeroSection = styled(Box)({
  position: 'relative',
  height: '70vh',
  width: '100%',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://media.istockphoto.com/id/542835242/photo/rome-italy.jpg?s=2048x2048&w=is&k=20&c=OmtZEok6lgI3dEnHN7ONv1_kEZD11pyG4RPfuxzqMsY=')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  marginBottom: '2rem',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))',
    zIndex: 1
  }
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  padding: '0 20px'
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%', // 1:1 비율
  position: 'relative',
});

const CardActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
});

const StyledIconButton = styled(IconButton)({
  color: '#666',
  '&:hover': {
    color: '#1976d2',
  }
});

// 구글 시트에서 데이터 가져오기
export async function getStaticProps() {
  // 여기에 구글 시트 ID를 넣습니다
  const SHEET_ID = '1MIT--uFyfu8eTUilnW1vgSEjZlAl9NUg44tb2jlbLg8';
  const SHEET_NAME = '시트1';
  
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text.substring(47).slice(0, -2));
    
    // 구글 시트의 데이터를 카드 형식으로 변환
    const cards = data.table.rows.slice(1).map(row => ({
      title: row.c[0]?.v || '',     // 제목 (A열)
      content: row.c[1]?.v || '',   // 원문 (B열)
      url: row.c[2]?.v || '',       // URL (C열)
      date: row.c[3]?.v || ''       // 작성일 (D열)
    }));

    return {
      props: { cards },
      revalidate: 60 // 1분마다 데이터 갱신
    };
  } catch (error) {
    console.error('Error:', error);
    return { props: { cards: [] } };
  }
}

export default function Home({ cards }) {
  return (
    <Box sx={{ bgcolor: '#FAFAFA', minHeight: '100vh' }}>
      <HeroSection>
        <HeroContent>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            La Dolce Vita
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 400,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            트라스테베레 지구의 아름다운 거리에서 펼쳐지는 로마의 달콤한 삶
          </Typography>
        </HeroContent>
      </HeroSection>

      {/* 기존 컨텐츠 섹션 */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            textAlign: 'center',
            color: '#333'
          }}
        >
          경제 뉴스
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {card.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(card.date).toLocaleDateString()}
                  </Typography>
                  {card.url && (
                    <Box sx={{ mt: 2 }}>
                      <a href={card.url} target="_blank" rel="noopener noreferrer" 
                         style={{ color: '#1976d2', textDecoration: 'none' }}>
                        뉴스 보기 →
                      </a>
                    </Box>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
