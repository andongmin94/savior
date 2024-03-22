# 코딩 컨벤션  

### Python Style (PEP 8: Python Style Guide)
Python 파일은 들여쓰기에 4개의 공백을 사용하고, HTML 파일은 2개의 공백을 사용한다.

문자열 변수 보간에는 %-포매팅, f-문자열, 또는 str.format()을 상황에 맞게 사용할 수 있으며, 코드의 가독성을 최대화하는 것이 목표입니다.

f-string은 오직 순수 변수와 속성 접근에만 사용하고, 보다 복잡한 경우에는 사전에 지역 변수 할당을 사용해야 합니다.
```python
# 좋은 예시
f"hello {user}"
f"hello {user.name}"
f"hello {self.user.name}"

# 잘못된 예시
f"hello {get_user()}"
f"you are {user.age * 365.25} days old"

# 지역 변수 할당을 사용한 경우
user = get_user()
f"hello {user}"
user_days_old = user.age * 365.25
f"you are {user_days_old} days old"
```

번역이 필요한 모든 문자열, 오류 및 로깅 메시지에는 f-문자열을 사용해서는 안 된다.  
일반적으로 format()이 더 장황하므로 다른 포매팅 방법이 선호된다.  

주석에서 "우리"의 사용을 피하고, 예를 들어 "우리가 반복한다" 대신 "반복한다"로 표현한다.

변수, 함수, 메서드 이름에는 언더스코어를 사용하고, camelCase는 사용하지 않는다 
```python
# 좋은 예시
def poll.get_unique_voters()
    ...

# 잘못된 예시
def poll.getUniqueVoters()
    ...
```

클래스 명은 파스칼 표기법을 사용한다.

테스트에서는 assertRaises()와 assertWarns() 대신 assertRaisesMessage()와 assertWarnsMessage()를 사용하여 예외나 경고 메시지를 확인할 수 있도록 합니다. 정규 표현식 매칭이 필요한 경우에만 assertRaisesRegex()와 assertWarnsRegex()를 사용합니다.


불리언 값을 테스트할 때는 assertTrue()와 assertFalse() 대신 assertIs(..., True/False)를 사용하여 실제 불리언 값을 확인할 수 있도록 합니다.

테스트 문서화 문자열에서 각 테스트가 보여주는 기대 동작을 명시합니다. "Tests that"이나 "Ensures that"과 같은 서문을 포함하지 않습니다.

문서화 문자열이나 주석에서 간단하게 설명할 수 없는 모호한 이슈에 대한 티켓 참조를 예약하고, 문장 끝에 이렇게 티켓 번호를 포함합니다:

```python
def test_foo():
    """
    이렇게 테스트 문서화 문자열을 작성합니다 (#123456).
    """
    ...
```
### Imports
Python에서 라이브러리를 임포트하는 경우, 일반적인 컨벤션은 표준 라이브러리, 관련 없는 서드 파티 라이브러리, 그리고 로컬 어플리케이션/라이브러리에 대한 임포트를 구분하여 그룹화하고, 각 그룹 내에서 알파벳 순으로 정렬하는 것입니다. 이 컨벤션은 PEP 8(파이썬 스타일 가이드)에 기술되어 있습니다.

위 코드를 PEP 8 가이드에 따라 정리하면 다음과 같습니다:

표준 라이브러리 임포트
서드 파티 라이브러리 임포트
로컬 어플리케이션/라이브러리 임포트
이 경우, contextlib은 표준 라이브러리, requests와 bs4(BeautifulSoup)는 서드 파티 라이브러리, pandas도 서드 파티 라이브러리에 해당합니다. 따라서, 적절한 순서는 다음과 같습니다:

python
Copy code
# 표준 라이브러리
from contextlib import nullcontext

# 서드 파티 라이브러리
import pandas as pd
import requests
from bs4 import BeautifulSoup
여기서 contextlib을 먼저 임포트하고, 그 다음에 알파벳 순서대로 pandas, requests, bs4 순으로 임포트합니다. 각 그룹은 한 줄 띄어서 구분합니다.

Use isort to automate import sorting using the guidelines below.

Quick start:

```bash
$ python -m pip install "isort >= 5.1.0"
$ isort .
```

This runs isort recursively from your current directory, modifying any files that don’t conform to the guidelines. If you need to have imports out of order (to avoid a circular import, for example) use a comment like this:

```python
import module  # isort:skip
```
Put imports in these groups: future, standard library, third-party libraries, other Django components, local Django component, try/excepts. Sort lines in each group alphabetically by the full module name. Place all import module statements before from module import objects in each section. Use absolute imports for other Django components and relative imports for local components.

On each line, alphabetize the items with the upper case items grouped before the lowercase items.

Break long lines using parentheses and indent continuation lines by 4 spaces. Include a trailing comma after the last import and put the closing parenthesis on its own line.

Use a single blank line between the last import and any module level code, and use two blank lines above the first function or class.

For example (comments are for explanatory purposes only):

django/contrib/admin/example.py¶

```python
# future
from __future__ import unicode_literals

# standard library
import json
from itertools import chain

# third-party
import bcrypt

# Django
from django.http import Http404
from django.http.response import (
Http404,
HttpResponse,
HttpResponseNotAllowed,
StreamingHttpResponse,
cookie,
)

# local Django
from .models import LogEntry

# try/except
try:
import yaml
except ImportError:
yaml = None

CONSTANT = "foo"


class Example: ...
```

Use convenience imports whenever available. For example, do this
```python
from django.views import View
```
instead of:
```python
from django.views.generic.base import View
```
Template style
Follow the below rules in Django template code.

{% extends %} should be the first non-comment line.

Do this:

```html
{% extends "base.html" %}

{% block content %}
  <h1 class="font-semibold text-xl">
    {{ pages.title }}
  </h1>
{% endblock content %}
```

Or this:

```html
{# This is a comment #}
{% extends "base.html" %}

{% block content %}
  <h1 class="font-semibold text-xl">
    {{ pages.title }}
  </h1>
{% endblock content %}
```

Don’t do this:

```html
{% load i18n %}
{% extends "base.html" %}

{% block content %}
  <h1 class="font-semibold text-xl">
    {{ pages.title }}
  </h1>
{% endblock content %}
```

Put exactly one space between {{, variable contents, and }}.

Do this:
```html
{{ user }}
```
Don’t do this:
```html
{{user}}
```
In {% load ... %}, list libraries in alphabetical order.

Do this:
```html
{% load i18n l10 tz %}
```
Don’t do this:
```html
{% load l10 i18n tz %}
```
Put exactly one space between {%, tag contents, and %}.

Do this:
```html
{% load humanize %}
```
Don’t do this:
```html
{%load humanize%}
```
Put the {% block %} tag name in the {% endblock %} tag if it is not on the same line.

Do this:
```html
{% block header %}
```
Code goes here

{% endblock header %}
Don’t do this:

{% block header %}

Code goes here

{% endblock %}
Inside curly braces, separate tokens by single spaces, except for around the . for attribute access and the | for a filter.

Do this:

{% if user.name|lower == "admin" %}
Don’t do this:

{% if user . name | lower  ==  "admin" %}

{{ user.name | upper }}
Within a template using {% extends %}, avoid indenting top-level {% block %} tags.

Do this:

{% extends "base.html" %}

{% block content %}
Don’t do this:

{% extends "base.html" %}

{% block content %}
...
View style
In Django views, the first parameter in a view function should be called request.

Do this:
```python
def my_view(request, foo): ...
```
Don’t do this:

```python
def my_view(req, foo): ...
```
Model style
Field names should be all lowercase, using underscores instead of camelCase.

Do this:
```python
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```
Don’t do this:
```python
class Person(models.Model):
    FirstName = models.CharField(max_length=20)
    Last_Name = models.CharField(max_length=40)
```
The class Meta should appear after the fields are defined, with a single blank line separating the fields and the class definition.

Do this:
```python
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
    
    class Meta:
        verbose_name_plural = "people"
```
Don’t do this:
```python
class Person(models.Model):
    class Meta:
        verbose_name_plural = "people"

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```
The order of model inner classes and standard methods should be as follows (noting that these are not all required):

All database fields
Custom manager attributes
class Meta
def __str__()
def save()
def get_absolute_url()
Any custom methods
If choices is defined for a given model field, define each choice as a mapping, with an all-uppercase name as a class attribute on the model. Example:

class MyModel(models.Model):
DIRECTION_UP = "U"
DIRECTION_DOWN = "D"
DIRECTION_CHOICES = {
DIRECTION_UP: "Up",
DIRECTION_DOWN: "Down",
}
Alternatively, consider using Enumeration types:

class MyModel(models.Model):
class Direction(models.TextChoices):
UP = "U", "Up"
DOWN = "D", "Down"
Use of django.conf.settings¶
Modules should not in general use settings stored in django.conf.settings at the top level (i.e. evaluated when the module is imported). The explanation for this is as follows:

Manual configuration of settings (i.e. not relying on the DJANGO_SETTINGS_MODULE environment variable) is allowed and possible as follows:

from django.conf import settings

settings.configure({}, SOME_SETTING="foo")
However, if any setting is accessed before the settings.configure line, this will not work. (Internally, settings is a LazyObject which configures itself automatically when the settings are accessed if it has not already been configured).

So, if there is a module containing some code as follows:

from django.conf import settings
from django.urls import get_callable

default_foo_view = get_callable(settings.FOO_VIEW)
…then importing this module will cause the settings object to be configured. That means that the ability for third parties to import the module at the top level is incompatible with the ability to configure the settings object manually, or makes it very difficult in some circumstances.

Instead of the above code, a level of laziness or indirection must be used, such as django.utils.functional.LazyObject, django.utils.functional.lazy() or lambda.


잡합 (Miscellaneous)

더 이상 사용되지 않는 import 문을 제거한다.
코드에서 이름을 넣지 말고, Django와 기여한 코드에 대한 기여자의 이름은 AUTHORS 파일에 넣는다.


---

---




python
Copy code
def test_foo():
"""
이렇게 테스트 문서화 문자열을 작성합니다 (#123456).
"""
가져오기 (Imports)

가져오기 정렬에 대한 아래 지침을 사용하여 isort를 사용해 자동으로 정렬합니다.

빠른 시작:

bash
Copy code
$ python -m pip install "isort >= 5.1.0"
$ isort .
이 명령은 현재 디렉토리에서 재귀적으로 isort를 실행하며, 지침에 맞지 않는 파일을 수정합니다. 순서를 바꿔야 하는 경우(예를 들어, 순환 임포트를 피하기 위해) 다음과 같은 주석을 사용합니다:

python
Copy code
import module  # isort:skip
템플릿 스타일

Django 템플릿 코드에서 아래 규칙을 따르세요.

{% extends %}는 첫 번째 비주석 줄이어야 합니다.
{{, 변수 내용, }} 사이에 정확히 한 칸의 공백을 넣습니다.
{% load ... %}에서 라이브러리를 알파벳 순서로 나열합니다.
{%, 태그 내용, %} 사이에 정확히 한 칸의 공백을 넣습니다.
{% block %} 태그 이름이 같은 줄에 없으면 {% endblock %} 태그에 넣습니다.
괄호 안의 토큰은 속성 접근을 위한 . 주변과 필터를 위한 | 주변을 제외하고 단일 공간으로 분리합니다.
{% extends %}를 사용하는 템플릿에서는 최상위 {% block %} 태그를 들여쓰지 않습니다.
뷰 스타일

Django 뷰에서, 뷰 함수의 첫 번째 매개변수는 request로 호출되어야 합니다.
모델 스타일

필드 이름은 모두 소문자를 사용하며, camelCase 대신 언더스코어를 사용합니다.
class Meta는 필드가 정의된 후에 나타나며, 필드와 클래스 정의 사이에 단일 빈 줄이 있어야 합니다.
모델의 내부 클래스와 표준 메서드의 순서는 다음과 같아야 합니다:
모든 데이터베이스 필드
사용자 정의 매니저 속성
class Meta
def str()
def save()
def get_absolute_url()
모든 사용자 정의 메서드






---

---



클래스 (Class)
class http_request
X
class HttpRequest
O
대문자와 소문자 둘 다 사용
대문자는 단어를 구분하는 용도로 단어들의 첫글자만 대문자 사용
명사로만 구성
_ 사용하지 않음
모듈 (Module)
import json
import re

from django.http import JsonResponse
from django.views import View
from users.models import User
X
import json
import re

from django.http import JsonResponse
from django.views import View

from users.models import User
O
Django가 제공한 모듈과 직접 생성한 모듈을 띄어서 구분한다.
빈 줄은 관련이 있는 로직 단위로 삽입한다.
코드 정렬 (Code Align)
class User(models.Model):
name = models.CharField(max_length=45)
email = models.CharField(max_length=100)
password = models.CharField(max_length=100)
mobile = models.CharField(max_length=100)
address = models.CharField(max_length=100)
birth_date = models.DateField()
X
class User(models.Model):
name       = models.CharField(max_length=45)
email      = models.CharField(max_length=100)
password   = models.CharField(max_length=100)
mobile     = models.CharField(max_length=100)
address    = models.CharField(max_length=100)
birth_date = models.DateField()
O
코드의 줄을 잘 맞추면 코드가 깔끔하고 정리된 느낌을 준다.
코드의 가독성을 높여준다.
가장 긴 변수명 기준으로 변수명
테이블 명
class Meta:
db_table = "user"
X
class Meta:
db_table = "users"
database 테이블 명은 소문자, 복수 형태로 지정
앱 이름
python manage.py startapp user
X
python manage.py startapp users
앱 이름은 복수