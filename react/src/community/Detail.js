import axios from 'axios';
import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DetailWrap = styled.div`
  width: 100%;
  padding: 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnSet = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;
function Detail() {
  const [detail, setDetail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const item = useMemo(() => ({ num: params.num }), [params]);

  const handleDelete = () => {
    const item = { num: params.num };
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    axios
      .post('/api/community/delete', item)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert('게시글이 삭제되었습니다.');
          navigate('/list');
        } else {
          alert('게시글이 삭제되지 않았습니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post('/api/community/detail', item)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [item]);

  return (
    <Layout name={'Layout'}>
      {
        <DetailWrap>
          <h2>{detail?.title}</h2>

          <p>{detail?.content}</p>
          <BtnSet>
            <Link to={`/edit/${detail?.communityNum}`}>Edit</Link>
            <button onClick={handleDelete}>delete</button>
          </BtnSet>
        </DetailWrap>
      }
    </Layout>
  );
}

export default Detail;
