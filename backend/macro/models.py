from django.db import models

#To add primary key 'id' into SQL database:
    #ALTER TABLE `` ADD `id` INT NOT NULL AUTO_INCREMENT UNIQUE FIRST


# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=80)

#     class Meta:
#         managed = False
#         db_table = 'auth_group'


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


# class AuthUserGroups(models.Model):
#     user = models.ForeignKey(AuthUser, models.DO_NOTHING)
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

#     class Meta:
#         managed = False
#         db_table = 'auth_user_groups'
#         unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Earnings(models.Model):
    stock_id = models.IntegerField(blank=True, null=True)
    quarter = models.CharField(db_column='Quarter', max_length=6, blank=True, null=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date', blank=True, null=True)  # Field name made lowercase.
    median = models.FloatField(db_column='Median', blank=True, null=True)  # Field name made lowercase.
    actual = models.FloatField(db_column='Actual', blank=True, null=True)  # Field name made lowercase.
    stddev = models.FloatField(db_column='StdDev', blank=True, null=True)  # Field name made lowercase.
    z_score = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'earnings'


class Macro(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    time = models.TimeField(db_column='Time', blank=True, null=True)  # Field name made lowercase.
    event = models.CharField(db_column='Event', max_length=100, blank=True, null=True)  # Field name made lowercase.
    ticker = models.CharField(db_column='Ticker', max_length=15, blank=True, null=True)  # Field name made lowercase.
    period = models.CharField(db_column='Period', max_length=10, blank=True, null=True)  # Field name made lowercase.
    actual = models.CharField(db_column='Actual', max_length=15, blank=True, null=True)  # Field name made lowercase.
    prior = models.CharField(db_column='Prior', max_length=15, blank=True, null=True)  # Field name made lowercase.
    survm = models.CharField(db_column='SurvM', max_length=15, blank=True, null=True)  # Field name made lowercase.
    surva = models.CharField(db_column='SurvA', max_length=15, blank=True, null=True)  # Field name made lowercase.
    noestimates = models.CharField(db_column='NoEstimates', max_length=5, blank=True, null=True)  # Field name made lowercase.
    surprise = models.CharField(db_column='Surprise', max_length=10, blank=True, null=True)  # Field name made lowercase.
    stddev = models.CharField(db_column='StdDev', max_length=10, blank=True, null=True)  # Field name made lowercase.
    c = models.CharField(db_column='C', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'macro'

class MacroInput(models.Model):
    Security=models.CharField(max_length=100)
    Indicator=models.CharField(max_length=100)
    Direction=models.CharField(max_length=100)
    Magnitude=models.CharField(max_length=100)

class StockId(models.Model):
    stock_id = models.IntegerField(primary_key=True)
    ticker = models.CharField(max_length=10)
    security = models.CharField(max_length=200)
    gics_sector = models.CharField(max_length=100, blank=True, null=True)
    gics_sub_industry = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stock_id'


class Stockprice(models.Model):
    id = models.IntegerField(primary_key=True)
    stock_id = models.IntegerField(blank=True, null=True)
    date = models.CharField(db_column='Date', max_length=100)  # Field name made lowercase.
    price = models.FloatField(db_column='Price', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stockprice'