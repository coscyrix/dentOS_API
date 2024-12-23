module.exports = {
  apps: [
    {
      name: 'dentOS_api',
      script: './app.js',
      watch: true,
      ignore_watch: ["node_modules", "activation", "public"],
      env_development: {
        NODE_ENV: 'development',
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
        cwd: '/home/coscyrix/dentOS_api',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_TLS_REJECT_UNAUTHORIZED: '1',
        cwd: '/home/vpsadmin/dentOS_api',
        exec_mode: 'cluster',
        instances: 0,
        increment_var: 'PORT',
        PORT: 8443,
        kill_timeout: 3000,
      },
    },
  ],
};


