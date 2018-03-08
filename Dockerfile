#
# Creates a docker container for the Coeus Portal
#

ARG DOCKERREPO=docker.io
FROM $DOCKERREPO/centos:7

ENV COEUS_APP_HOME /var/coeus-portal/

ARG USENEXUS
RUN [ "$USENEXUS" != "true" ] && \
		(yum -y --setopt=tsflags=nodocs install epel-release) \
	|| \
		(rm -f /etc/yum.repos.d/*.repo && \
		echo '[base]' > /etc/yum.repos.d/nexus.repo && \
		echo 'name=Nexus Centos7 - Base' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.16.12:8081/repository/yum-centos7-base/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7' >> /etc/yum.repos.d/nexus.repo && \
		echo '[updates]' >> /etc/yum.repos.d/nexus.repo && \
		echo 'name=Nexus Centos7 - Updates' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.16.12:8081/repository/yum-centos7-updates/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7' >> /etc/yum.repos.d/nexus.repo && \
		echo '[epel]' >> /etc/yum.repos.d/nexus.repo && \
		echo 'name=Extra Packages for Enterprise Linux 7' >> /etc/yum.repos.d/nexus.repo && \
		echo 'baseurl=http://10.0.16.12:8081/repository/yum-epel7/' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgcheck=1' >> /etc/yum.repos.d/nexus.repo && \
		echo 'gpgkey=http://download.fedoraproject.org/pub/epel/RPM-GPG-KEY-EPEL-7' >> /etc/yum.repos.d/nexus.repo)

# Add the nodesource repository for latest node/npm version
RUN curl -sL https://rpm.nodesource.com/setup_9.x | bash -

RUN INSTALL_PKGS="nodejs" && \
    yum -y --setopt=tsflags=nodocs install $INSTALL_PKGS && \
    rpm -V $INSTALL_PKGS && \
    yum clean all  && \
    localedef -f UTF-8 -i en_US en_US.UTF-8

# Create a coeus user to run the app
RUN groupadd -r coeus -g 3001 && \
    useradd -u 3001 -r -g coeus -m -d ${COEUS_APP_HOME} -c "Coeus Run User" coeus

# Add the build dist folder and package.json (for npm resolution)
ADD --chown=coeus:coeus dist ${COEUS_APP_HOME}dist/
ADD --chown=coeus:coeus package.json ${COEUS_APP_HOME}

RUN [ "$USENEXUS" != "true" ] || \
	(echo 'registry=http://10.0.16.12:8081/repository/npm-registry/' > ${COEUS_APP_HOME}.npmrc && \
	echo '_auth=YWRtaW46a2xqZmFzZnU4OTcyMzQ5OGllYWZvbmQz' >> ${COEUS_APP_HOME}.npmrc && \
	chown coeus:coeus ${COEUS_APP_HOME}.npmrc)

EXPOSE 3000

ENV RABBITMQ_USER=coeusportal
ENV RABBITMQ_PASSWORD=cpiojoi098uguer9
ENV RABBITMQ_SERVER=192.168.99.100
ENV RABBITMQ_PORT=5672
ENV PORT=3000
ENV COEUS_ENVIRONMENT=localdocker
# this will always be Production
ENV NODE_ENV=production

WORKDIR ${COEUS_APP_HOME}

USER coeus

RUN npm install --no-optional --loglevel verbose

CMD node ${COEUS_APP_HOME}dist/server/bin/www.js
