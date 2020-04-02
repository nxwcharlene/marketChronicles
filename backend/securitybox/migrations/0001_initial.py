# Generated by Django 3.0.4 on 2020-04-02 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Earnings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_id', models.IntegerField(blank=True, null=True)),
                ('quarter', models.CharField(blank=True, db_column='Quarter', max_length=6, null=True)),
                ('date', models.DateField(blank=True, db_column='Date', null=True)),
                ('median', models.FloatField(blank=True, db_column='Median', null=True)),
                ('actual', models.FloatField(blank=True, db_column='Actual', null=True)),
                ('stddev', models.FloatField(blank=True, db_column='StdDev', null=True)),
                ('z_score', models.CharField(blank=True, max_length=15, null=True)),
            ],
            options={
                'db_table': 'earnings',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Macro',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('date', models.DateField(db_column='Date')),
                ('time', models.TimeField(blank=True, db_column='Time', null=True)),
                ('event', models.CharField(blank=True, db_column='Event', max_length=100, null=True)),
                ('ticker', models.CharField(blank=True, db_column='Ticker', max_length=15, null=True)),
                ('period', models.CharField(blank=True, db_column='Period', max_length=10, null=True)),
                ('actual', models.CharField(blank=True, db_column='Actual', max_length=15, null=True)),
                ('prior', models.CharField(blank=True, db_column='Prior', max_length=15, null=True)),
                ('survm', models.CharField(blank=True, db_column='SurvM', max_length=15, null=True)),
                ('surva', models.CharField(blank=True, db_column='SurvA', max_length=15, null=True)),
                ('noestimates', models.CharField(blank=True, db_column='NoEstimates', max_length=5, null=True)),
                ('surprise', models.CharField(blank=True, db_column='Surprise', max_length=10, null=True)),
                ('stddev', models.CharField(blank=True, db_column='StdDev', max_length=10, null=True)),
                ('c', models.CharField(blank=True, db_column='C', max_length=10, null=True)),
            ],
            options={
                'db_table': 'macro',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StockId',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_id', models.IntegerField(blank=True, null=True)),
                ('ticker', models.CharField(max_length=10)),
                ('security', models.CharField(max_length=200)),
                ('gics_sector', models.CharField(blank=True, max_length=100, null=True)),
                ('gics_sub_industry', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'stock_id',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Stockprice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_id', models.IntegerField(blank=True, null=True)),
                ('date', models.DateField(blank=True, db_column='Date', null=True)),
                ('price', models.FloatField(blank=True, db_column='Price', null=True)),
            ],
            options={
                'db_table': 'stockprice',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MacroInput',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Security', models.CharField(max_length=100)),
                ('Indicator', models.CharField(max_length=100)),
                ('Direction', models.CharField(max_length=100)),
                ('Magnitude', models.CharField(max_length=100)),
            ],
        ),
    ]
