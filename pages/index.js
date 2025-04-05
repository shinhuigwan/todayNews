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
  background: 'white',
  borderRadius: '16px',
  boxShadow: 'none',
  border: '1px solid #eee',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  }
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

export default function Home() {
  const cards = [
    {
      title: '2024 봄 트렌드',
      description: '올해의 패션 트렌드를 한눈에',
      image: 'https://source.unsplash.com/random/800x800?fashion,spring',
      likes: 2453,
    },
    {
      title: '건강한 아침식사',
      description: '영양가 있는 아침 한끼',
      image: 'https://source.unsplash.com/random/800x800?healthy,breakfast',
      likes: 1829,
    },
    {
      title: '홈 오피스 꾸미기',
      description: '효율적인 재택근무 공간',
      image: 'https://source.unsplash.com/random/800x800?office,minimal',
      likes: 3102,
    },
    {
      title: '봄 인테리어',
      description: '화사한 봄맞이 인테리어',
      image: 'https://source.unsplash.com/random/800x800?interior,spring',
      likes: 2789,
    },
    {
      title: '주말 브런치',
      description: '특별한 주말 브런치 레시피',
      image: 'https://source.unsplash.com/random/800x800?brunch,coffee',
      likes: 1567,
    },
    {
      title: '미니멀 라이프',
      description: '심플한 생활의 즐거움',
      image: 'https://source.unsplash.com/random/800x800?minimal,lifestyle',
      likes: 4231,
    }
  ];

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
          트렌딩 카드뉴스
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="small">
                      <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {card.likes.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <ShareIcon />
                    </IconButton>
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                  </Box>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
