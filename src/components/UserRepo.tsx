import { ListItem, Typography, Grid, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface UserRepoProps {
  repo: any;
  index: number;
}

const UserRepo: React.FC<UserRepoProps> = ({ repo, index }) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ mb: 1, mt: index === 0 ? 2 : 0, backgroundColor: '#999' }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Typography
            variant="body1"
            fontWeight="bold"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {repo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {repo.description || 'No description'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Typography component="span" variant="body2">
              {repo.stargazers_count}
            </Typography>
            <StarIcon />
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default UserRepo;
