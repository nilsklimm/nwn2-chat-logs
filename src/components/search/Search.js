import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Layer, TextInput } from 'grommet';
import { FormSearch } from 'grommet-icons';
import debounce from 'lodash.debounce';
import styled from 'styled-components';

import SearchResults from './SearchResults';

const MIN_SEARCH_LENGTH = 2;

const SearchInput = styled(TextInput)`
  background-color: white;
  color: black;

  &, &:focus {
    box-shadow: none;
  }
`;

const Search = () => {
  const targetRef = useRef();
  const [value, setValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onIconClick = useCallback(
    () => {
      setInputVisible(true);
    },
    []
  );

  const onBlur = useCallback(
    () => {
      setInputVisible(false);
    },
    []
  );

  const onChange = useMemo(
    () => debounce(
      e => {
        const nextValue = e.target.value;
        setValue(nextValue);
        setModalVisible(nextValue.length >= MIN_SEARCH_LENGTH);
      },
      100
    ),
    [setValue]
  );

  const hide = useCallback(() => setModalVisible(false), []);

  useEffect(
    () => {
      if (inputVisible) {
        targetRef.current.focus();
      }
    },
    [inputVisible],
  );

  return (
    <>
      <Box>
        {inputVisible ? (
          <SearchInput
            ref={targetRef}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Search"
          />
        ) : (
          <Button
            onClick={onIconClick}
            icon={<FormSearch />}
            label="Search"
            size="small"
            plain
          />
        )}
      </Box>
      {modalVisible && (
        <Layer
          onClickOutside={hide}
          onEsc={hide}
          modal={false}
        >
          <Box pad="large">
            <SearchResults {...{ search: value.trim(), hide }} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default Search;
