import React, { useState } from 'react';
import './LegalText.css';

const LegalText = () => {
  const [categoryFilter, setCategoryFilter] = useState('전체');

  // 법률 문서 데이터
  const legalDocuments = [
    {
      id: 1,
      title: '근로기준법',
      category: '근로기준법',
      content: `
        제1장 총칙
        제1조 (목적) 이 법은 헌법에 따라 근로조건의 기준을 정함으로써 근로자의 기본적인 생활을 보장하며, 나아가 국민경제의 균형 있는 발전을 도모하는 것을 목적으로 한다.
        
        제2조 (정의) 이 법에서 사용하는 용어의 뜻은 다음과 같다.
        1. "근로자"란 직업의 종류와 관계없이 임금을 목적으로 사업이나 사업장에 근로를 제공하는 사람을 말한다.
        2. "사용자"란 사업주 또는 사업경영담당자로서 근로자를 사용하는 자를 말한다.
        
        제2장 근로계약
        제15조 (근로조건의 명시) 사용자는 근로계약을 체결할 때 근로자에게 임금, 근로시간, 휴일, 연차유급휴가, 그 밖에 필요한 사항을 명시하여야 한다.
      `,
    },
    {
      id: 2,
      title: '헌법',
      category: '헌법',
      content: `
        제1장 총강
        제1조 ① 대한민국은 민주공화국이다.
        ② 대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.
        
        제2조 ① 대한민국의 국민이 되는 요건은 법률로 정한다.
        ② 국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다.
        
        제3조 대한민국의 영토는 한반도와 그 부속도서로 한다.
        
        제4조 대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일 정책을 수립하고 이를 추진한다.
      `,
    },
    // 추가적으로 다른 법률 문서들을 이곳에 추가할 수 있습니다.
  ];

  const filteredDocuments = categoryFilter === '전체'
    ? legalDocuments
    : legalDocuments.filter(doc => doc.category === categoryFilter);

  const categories = ['전체', '근로기준법', '헌법'];

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
