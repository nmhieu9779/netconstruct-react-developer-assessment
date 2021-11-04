import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin-bottom: 5px;
`;

const SuggestionContainer = styled.ul`
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  position: absolute;
  background: white;
  top: 41px;
`;

const Suggestion = styled.li`
  padding: 0.5rem;
  cursor: pointer;
`;

const Category = styled.div`
  width: max-content;
  padding: 5px;
  background-color: #96cdf6;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  white-space: nowrap;
`;

const FilterData = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface Props {
  data: string[];
  filterData: string[];
  onChange: (category: string) => void;
}

const Filter: React.FC<Props> = (props) => {
  const { data, filterData, onChange } = props;

  const [input, setInput] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    let filteredData = data.filter((category) => !filterData.includes(category)) as string[];
    if (input !== '') {
      filteredData = filteredData.filter((category) =>
        category.toLowerCase().includes(input.toLowerCase()),
      );
    }
    setFilteredSuggestions(filteredData);
  }, [data, filterData, input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setInput(userInput);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      setInput('');
      onChange(e.currentTarget.title);
    },
    [onChange],
  );

  return (
    <Container>
      <Input placeholder={'Category'} type={'text'} onChange={handleChange} value={input} />
      <FilterData>
        {filterData.map((category) => (
          <Category key={category}>{category}</Category>
        ))}
      </FilterData>
      {input && (
        <SuggestionContainer>
          {filteredSuggestions.map((suggestion) => {
            return (
              <Suggestion title={suggestion} key={suggestion} onClick={handleClick}>
                {suggestion}
              </Suggestion>
            );
          })}
        </SuggestionContainer>
      )}
    </Container>
  );
};

export default memo(Filter);
