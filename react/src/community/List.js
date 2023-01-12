import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import styled from 'styled-components';
const Item = styled.article`
  width: 100%;
  padding: 30px 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
  margin-bottom: 50px;
`;
function List() {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .post('/api/community/read')
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setList(res.data.communityList);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout name={'List'}>
      {list.map((post) => {
        return (
          <Item key={post._id}>
            <h2>
              <Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
            </h2>
          </Item>
        );
      })}
    </Layout>
  );
}

export default List;
