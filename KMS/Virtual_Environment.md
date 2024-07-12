## 가상 환경 설치

1. 설치 리스트 확인
```python
pip list
```

2. 가상 환경 만들기
```python
python -m venv myenv(파일이름)
.\myenv\Scripts\activate
```

3. 설치하는 법
```python
pip install 파일이름
```

4. 가상 환경에 설치된 패키지 확인
```python
pip freeze
```

5. 설치된 패키지를 문서로 정리 - 이를 통해 다른 가상환경 및 pc에서도 패키지 설치 손쉽게 가능
```python
pip freeze > requirement.txt
```

6. 가상환경에서 빠져나오기
```python
deactivate
```

7. 가상환경 없애기
```python
rmdir myenv(파일이름)
```

8. 공용 공간에 있는 모든 패키지를 가상 환경을 만들면서 옮기고 싶을 때
```python
python -m venv myenv --system-site-packages
```

9. 8번에 있는 내용을 실행하고, 가상 공간에 따로 파일을 설치하였을 때 가상 공간에 있는 설치내용만 확인하는 법
```python
pip list --local
```






