import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import { searchUsers } from '../api/github';
import {
  TextField,
  Button,
  List,
  FormControl,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import User from './User';

const UserSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch users
  const { isFetching: isFetchingUsers, refetch: refetchUsers } = useQuery(
    ['searchUsers', query],
    () => searchUsers(query),
    {
      enabled: false,
      onSuccess: (data) => {
        setUsers(data);
        setSearchPerformed(true); // Indicate that a search has been performed
      },
    }
  );

  // Trigger search and fetch repositories
  const handleSearch = useCallback(async () => {
    if (query) {
      await refetchUsers();
    }
  }, [query, refetchUsers]);

  const handleClear = () => {
    setQuery('');
    setUsers([]);
    setSearchPerformed(false); // Reset searchPerformed state
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    if (event.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        GitHub Repositories Explorer
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Enter username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button fullWidth size="large" variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {isFetchingUsers ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <CircularProgress />
        </Box>
      ) : users.length > 0 ? (
        <List>
          {query && (
            <Typography variant="body2" color="textSecondary">
              Showing users for '{query}'
            </Typography>
          )}
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </List>
      ) : searchPerformed && users.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No users found.
        </Typography>
      ) : null}
    </div>
  );
};

export default UserSearch;
