FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
RUN apt-get update && apt install gcc -y && apt-get install build-essential -y && apt-get install python3-dev -y
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

EXPOSE 8000