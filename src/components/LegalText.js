// src/components/LegalText.js
import React, { useState } from 'react';
import './LegalText';

const LegalText = () => {
  const [categoryFilter, setCategoryFilter] = useState('전체'); // 초기 카테고리 설정

  // 예시 법률 데이터
  const legalDocuments = [
    { id: 1, title: '법률 문서 1', category: '카테고리 A', content: '법률 문서 내용 1' },
    { id: 2, title: '법률 문서 2', category: '카테고리 B', content: '법률 문서 내용 2' },
    { id: 3, title: '법률 문서 3', category: '카테고리 A', content: '법률 문서 내용 3' },
    { id: 4, title: '법률 문서 4', category: '카테고리 C', content: '법률 문서 내용 4' },
  ];

  // 모든 법률 문서 표시
  const filteredDocuments = categoryFilter === '전체'
    ? legalDocuments
    : legalDocuments.filter(doc => doc.category === categoryFilter);

  // 카테고리 목록
  const categories = ['전체', '카테고리 A', '카테고리 B', '카테고리 C'];

  // 카테고리 버튼 클릭 핸들러
  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
  };

  return (
    <div className="legal-text">
      <div className="categories">
        <h3>카테고리</h3>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={category === categoryFilter ? 'active' : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-content">
        {filteredDocuments.map((doc) => (
          <div key={doc.id}>
            <h2>{doc.title}</h2>
            <p>{doc.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalText;
