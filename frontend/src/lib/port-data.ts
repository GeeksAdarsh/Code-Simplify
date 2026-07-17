export interface PortInfo {
  port: number;
  protocol: "TCP" | "UDP" | "TCP/UDP";
  service: string;
  description: string;
}

export const COMMON_PORTS: PortInfo[] = [
  { port: 20, protocol: "TCP", service: "FTP (data)", description: "File Transfer Protocol \u2014 data channel." },
  { port: 21, protocol: "TCP", service: "FTP (control)", description: "File Transfer Protocol \u2014 command channel." },
  { port: 22, protocol: "TCP", service: "SSH / SFTP", description: "Secure Shell remote login and secure file transfer." },
  { port: 23, protocol: "TCP", service: "Telnet", description: "Unencrypted remote terminal access (legacy, insecure)." },
  { port: 25, protocol: "TCP", service: "SMTP", description: "Simple Mail Transfer Protocol \u2014 sending email between servers." },
  { port: 43, protocol: "TCP", service: "WHOIS", description: "Domain/IP ownership lookup protocol." },
  { port: 53, protocol: "TCP/UDP", service: "DNS", description: "Domain Name System \u2014 resolves hostnames to IP addresses." },
  { port: 67, protocol: "UDP", service: "DHCP (server)", description: "Dynamic Host Configuration Protocol \u2014 server." },
  { port: 68, protocol: "UDP", service: "DHCP (client)", description: "Dynamic Host Configuration Protocol \u2014 client." },
  { port: 69, protocol: "UDP", service: "TFTP", description: "Trivial File Transfer Protocol." },
  { port: 80, protocol: "TCP", service: "HTTP", description: "Hypertext Transfer Protocol \u2014 unencrypted web traffic." },
  { port: 88, protocol: "TCP/UDP", service: "Kerberos", description: "Network authentication protocol." },
  { port: 110, protocol: "TCP", service: "POP3", description: "Post Office Protocol v3 \u2014 retrieving email." },
  { port: 111, protocol: "TCP/UDP", service: "RPCbind", description: "Remote Procedure Call port mapper." },
  { port: 119, protocol: "TCP", service: "NNTP", description: "Network News Transfer Protocol \u2014 Usenet." },
  { port: 123, protocol: "UDP", service: "NTP", description: "Network Time Protocol \u2014 clock synchronization." },
  { port: 135, protocol: "TCP", service: "MS RPC", description: "Microsoft RPC endpoint mapper." },
  { port: 137, protocol: "UDP", service: "NetBIOS Name Service", description: "Windows NetBIOS name resolution." },
  { port: 138, protocol: "UDP", service: "NetBIOS Datagram", description: "Windows NetBIOS datagram service." },
  { port: 139, protocol: "TCP", service: "NetBIOS Session", description: "Windows file/printer sharing (legacy SMB)." },
  { port: 143, protocol: "TCP", service: "IMAP", description: "Internet Message Access Protocol \u2014 retrieving email." },
  { port: 161, protocol: "UDP", service: "SNMP", description: "Simple Network Management Protocol \u2014 monitoring." },
  { port: 162, protocol: "UDP", service: "SNMP Trap", description: "SNMP trap/notification receiver." },
  { port: 179, protocol: "TCP", service: "BGP", description: "Border Gateway Protocol \u2014 internet routing." },
  { port: 194, protocol: "TCP", service: "IRC", description: "Internet Relay Chat." },
  { port: 389, protocol: "TCP/UDP", service: "LDAP", description: "Lightweight Directory Access Protocol." },
  { port: 443, protocol: "TCP", service: "HTTPS", description: "HTTP over TLS/SSL \u2014 encrypted web traffic." },
  { port: 445, protocol: "TCP", service: "SMB", description: "Server Message Block \u2014 Windows file/printer sharing." },
  { port: 465, protocol: "TCP", service: "SMTPS", description: "SMTP over implicit TLS \u2014 encrypted email submission." },
  { port: 500, protocol: "UDP", service: "IKE / IPsec", description: "Internet Key Exchange for IPsec VPNs." },
  { port: 514, protocol: "UDP", service: "Syslog", description: "System logging protocol." },
  { port: 515, protocol: "TCP", service: "LPD/LPR", description: "Line Printer Daemon \u2014 printing protocol." },
  { port: 520, protocol: "UDP", service: "RIP", description: "Routing Information Protocol." },
  { port: 587, protocol: "TCP", service: "SMTP (submission)", description: "SMTP mail submission with STARTTLS." },
  { port: 631, protocol: "TCP/UDP", service: "IPP / CUPS", description: "Internet Printing Protocol." },
  { port: 636, protocol: "TCP", service: "LDAPS", description: "LDAP over TLS/SSL." },
  { port: 873, protocol: "TCP", service: "rsync", description: "File synchronization protocol." },
  { port: 993, protocol: "TCP", service: "IMAPS", description: "IMAP over TLS/SSL \u2014 encrypted email retrieval." },
  { port: 995, protocol: "TCP", service: "POP3S", description: "POP3 over TLS/SSL \u2014 encrypted email retrieval." },
  { port: 1080, protocol: "TCP", service: "SOCKS Proxy", description: "SOCKS proxy protocol." },
  { port: 1194, protocol: "UDP", service: "OpenVPN", description: "OpenVPN default port." },
  { port: 1433, protocol: "TCP", service: "Microsoft SQL Server", description: "MS SQL Server database engine." },
  { port: 1521, protocol: "TCP", service: "Oracle DB", description: "Oracle database listener." },
  { port: 1723, protocol: "TCP", service: "PPTP", description: "Point-to-Point Tunneling Protocol VPN." },
  { port: 1883, protocol: "TCP", service: "MQTT", description: "Lightweight IoT messaging protocol." },
  { port: 2049, protocol: "TCP/UDP", service: "NFS", description: "Network File System." },
  { port: 2082, protocol: "TCP", service: "cPanel", description: "cPanel web hosting control panel (unencrypted)." },
  { port: 2083, protocol: "TCP", service: "cPanel (SSL)", description: "cPanel web hosting control panel (encrypted)." },
  { port: 2181, protocol: "TCP", service: "ZooKeeper", description: "Apache ZooKeeper client port." },
  { port: 27017, protocol: "TCP", service: "MongoDB", description: "MongoDB default database port." },
  { port: 27018, protocol: "TCP", service: "MongoDB (shard)", description: "MongoDB shard server default port." },
  { port: 3000, protocol: "TCP", service: "Dev server (common)", description: "Common default port for Node.js/React/Next.js dev servers." },
  { port: 3128, protocol: "TCP", service: "Squid Proxy", description: "Common HTTP proxy port." },
  { port: 3268, protocol: "TCP", service: "LDAP (Global Catalog)", description: "Active Directory global catalog." },
  { port: 3306, protocol: "TCP", service: "MySQL / MariaDB", description: "MySQL/MariaDB database engine." },
  { port: 3389, protocol: "TCP", service: "RDP", description: "Remote Desktop Protocol \u2014 Windows remote access." },
  { port: 3690, protocol: "TCP", service: "Subversion (SVN)", description: "Apache Subversion version control." },
  { port: 4369, protocol: "TCP", service: "Erlang Port Mapper", description: "Used by RabbitMQ and other Erlang/OTP apps." },
  { port: 5000, protocol: "TCP", service: "Dev server (common)", description: "Common default port for Flask/Docker Registry dev servers." },
  { port: 5222, protocol: "TCP", service: "XMPP (client)", description: "Extensible Messaging and Presence Protocol \u2014 client connections." },
  { port: 5432, protocol: "TCP", service: "PostgreSQL", description: "PostgreSQL database engine." },
  { port: 5601, protocol: "TCP", service: "Kibana", description: "Kibana dashboard for the Elastic Stack." },
  { port: 5672, protocol: "TCP", service: "AMQP / RabbitMQ", description: "Advanced Message Queuing Protocol." },
  { port: 5900, protocol: "TCP", service: "VNC", description: "Virtual Network Computing \u2014 remote desktop." },
  { port: 5984, protocol: "TCP", service: "CouchDB", description: "Apache CouchDB HTTP API." },
  { port: 6379, protocol: "TCP", service: "Redis", description: "Redis in-memory data store." },
  { port: 6443, protocol: "TCP", service: "Kubernetes API", description: "Kubernetes API server default port." },
  { port: 6666, protocol: "TCP", service: "IRC (alt)", description: "Alternate IRC port." },
  { port: 6667, protocol: "TCP", service: "IRC", description: "Common Internet Relay Chat port." },
  { port: 7000, protocol: "TCP", service: "Cassandra (inter-node)", description: "Apache Cassandra inter-node communication." },
  { port: 8000, protocol: "TCP", service: "Dev server (common)", description: "Common alternate HTTP dev server port." },
  { port: 8080, protocol: "TCP", service: "HTTP (alt)", description: "Common alternate HTTP port, often used by proxies and dev servers (e.g. Spring Boot default)." },
  { port: 8081, protocol: "TCP", service: "HTTP (alt)", description: "Common alternate HTTP proxy/admin port." },
  { port: 8443, protocol: "TCP", service: "HTTPS (alt)", description: "Common alternate HTTPS port for app servers like Tomcat." },
  { port: 8888, protocol: "TCP", service: "HTTP (alt) / Jupyter", description: "Common alternate HTTP port; default for Jupyter Notebook." },
  { port: 9000, protocol: "TCP", service: "PHP-FPM / SonarQube", description: "Common port for PHP-FPM and SonarQube web UI." },
  { port: 9042, protocol: "TCP", service: "Cassandra (CQL)", description: "Apache Cassandra native client port." },
  { port: 9092, protocol: "TCP", service: "Kafka", description: "Apache Kafka broker default port." },
  { port: 9200, protocol: "TCP", service: "Elasticsearch (HTTP)", description: "Elasticsearch REST API." },
  { port: 9300, protocol: "TCP", service: "Elasticsearch (transport)", description: "Elasticsearch node-to-node transport." },
  { port: 11211, protocol: "TCP/UDP", service: "Memcached", description: "Memcached in-memory caching system." },
  { port: 27015, protocol: "TCP/UDP", service: "Source Engine (games)", description: "Valve Source engine multiplayer games." },
];

export function findPortsByQuery(query: string): PortInfo[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return COMMON_PORTS;

  if (/^\d+$/.test(trimmed)) {
    const num = Number(trimmed);
    return COMMON_PORTS.filter((p) => p.port === num);
  }

  return COMMON_PORTS.filter(
    (p) =>
      p.service.toLowerCase().includes(trimmed) ||
      p.description.toLowerCase().includes(trimmed) ||
      p.protocol.toLowerCase().includes(trimmed)
  );
}
