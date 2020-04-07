"""
Django settings for marketChronicles project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '09z=flz0$y1n-md7)%u56v2ed#jmap&3^x1wk$-h$68fjd(g=)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [] # this is to allow frontend to call the backend


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'macro',
    'earnings',
    'pricemovement',
    'corsheaders',
    'rest_framework',
    'securitybox',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'marketChronicles.middleware.CORSMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'marketChronicles.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'marketChronicles.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    ## when everyone's on the same network:
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'bf3210_database',
    #     'USER': 'cheklin',
    #     'PASSWORD': 'sharedpassword',
    #     'HOST': '172.22.143.201',
    #     'PORT': '3306',
    # }
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'bf3210_database',
    #     'USER': 'root',
    #     'PASSWORD': '1234qwer',
    #     'HOST': '127.0.0.1',
    #     'PORT':'3306'
    # }
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'newschema',
        'USER': 'root',
        'PASSWORD': 'sharedpassword',
        'HOST': '127.0.0.1',
        'PORT':'3306'
    }
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': 'bf3210_database',
    #     'USER': 'root',
    #     'PASSWORD': '1234qwer',
    #     'HOST': '127.0.0.1',
    #     'PORT': '3306',
    # }
    #     'default': {
    #         'ENGINE': 'django.db.backends.mysql',
    #         'NAME': 'new_schema',
    #         'USER': 'root',
    #         'PASSWORD': 'test',
    #         'HOST': '127.0.0.1',
    #         'PORT': '3306'
    # }
}

CORS_ORIGIN_ALLOW_ALL=True
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOW_METHODS = [
#     'DELETE',
#     'GET',
#     'OPTIONS',
#     'PATCH',
#     'POST',
#     'PUT',
# ]
# CORS_ALLOW_HEADERS = [
#     'accept',
#     'accept-encoding',
#     'authorization',
#     'content-type',
#     'dnt',
#     'origin',
#     'user-agent',
#     'x-csrftoken',
#     'x-requested-with',
# ]

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

