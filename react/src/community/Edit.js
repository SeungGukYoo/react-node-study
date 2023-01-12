import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../common/Layout';
import styled from 'styled-components';

const BtnSet = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;
function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleUpdate = () => {
    if (title.trim() === '' || content.trim() === '') return alert('모든 항목을 입력하세요.');
    const item = {
      title: title,
      content: content,
      num: params.num
    };
    axios
      .post('/api/community/edit', item)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert('글수정이 완료되었습니다.');
          navigate(`/detail/${params.num}`);
        } else {
          alert('글수정이 완료되지 않았습니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const item = { num: params.num };
    axios.post('/api/community/detail', item).then((res) => {
      if (res.data.success) {
        console.log(res.data.detail);
        setDetail(res.data.detail);
      }
    });
  }, [params]);

  useEffect(() => {
    console.log(detail);
    setTitle(detail.title);
    setContent(detail.content);
  }, [detail]);

  return (
    <Layout name={'Edit'}>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        id='title'
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='content'>Content</label>
      <textarea
        name='text'
        id='text'
        cols='30'
        rows='4'
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <BtnSet>
        <button onClick={() => navigate(-1)}>Cancle</button>
        <button onClick={handleUpdate}>Update</button>
      </BtnSet>
    </Layout>
  );
}

export default Edit;
