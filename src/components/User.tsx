import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserRepos } from '../api/github';
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UserRepo from './UserRepo';

interface UserProps {
  user: any;
}

const User: React.FC<UserProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const { data: userRepos, isFetching: isFetchingRepos } = useQuery(
    ['userRepos', user.login],
    () => getUserRepos(user.login),
    { enabled: open }
  );

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box mb={2}>
      <ListItem
        button
        onClick={handleToggle}
        sx={{ backgroundColor: '#CCC', '&:hover': { backgroundColor: '#DDD' } }}
      >
        <ListItemText
          primary={user.login}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isFetchingRepos ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={200}
            >
              <CircularProgress />
            </Box>
          ) : userRepos && userRepos.length > 0 ? (
            userRepos.map((repo: any, index: number) => (
              <UserRepo key={repo.id} repo={repo} index={index} />
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" color="textSecondary">
                User '{user.login}' has no repositories.
              </Typography>
            </ListItem>
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default User;
