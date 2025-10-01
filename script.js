// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const homeLink = document.getElementById('home-link');
    const submitQueryLink = document.getElementById('submit-query-link');
    const trackQueryLink = document.getElementById('track-query-link');
    const adminLink = document.getElementById('admin-link');
    
    const homeSection = document.getElementById('home');
    const submitQuerySection = document.getElementById('submit-query');
    const trackQuerySection = document.getElementById('track-query');
    const adminPortalSection = document.getElementById('admin-portal');
    
    const newQueryBtn = document.getElementById('new-query-btn');
    const checkStatusBtn = document.getElementById('check-status-btn');
    
    // Form Elements
    const queryForm = document.getElementById('query-form');
    const adminLoginForm = document.getElementById('admin-login-form');
    
    // Admin Elements
    const adminLogin = document.getElementById('admin-login');
    const adminDashboard = document.getElementById('admin-dashboard');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Modal Elements
    const queryModal = document.getElementById('query-modal');
    const closeModal = document.querySelector('.close-modal');
    const queryDetailsContent = document.getElementById('query-details-content');
    const adminActions = document.getElementById('admin-actions');
    const updateStatusBtn = document.getElementById('update-status-btn');
    
    // Notification Element
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    // Track Query Elements
    const searchQueryBtn = document.getElementById('search-query-btn');
    const searchEmailBtn = document.getElementById('search-email-btn');
    const queryResults = document.getElementById('query-results');
    const queryList = document.querySelector('.query-list');
    
    // Sample Data (In a real application, this would be stored in a database)
    let queries = [
        {
            id: 'QRY1001',
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            hostelType: 'boys',
            roomNumber: 'B-101',
            queryType: 'maintenance',
            subject: 'Broken Fan',
            description: 'The ceiling fan in my room is not working properly.',
            date: '2023-07-15',
            status: 'ongoing',
            comments: [{
                text: 'Maintenance team has been notified.',
                date: '2023-07-16',
                by: 'admin'
            }]
        },
        {
            id: 'QRY1002',
            name: 'Jane Smith',
            email: 'jane.smith@gmail.com',
            hostelType: 'girls',
            roomNumber: 'G-205',
            queryType: 'facility',
            subject: 'Water Cooler Issue',
            description: 'The water cooler on our floor is not cooling properly.',
            date: '2023-07-10',
            status: 'successful',
            comments: [{
                text: 'Technician has fixed the water cooler.',
                date: '2023-07-12',
                by: 'admin'
            }]
        },
        {
            id: 'QRY1003',
            name: 'Mike Johnson',
            email: 'mike.johnson@gmail.com',
            hostelType: 'boys',
            roomNumber: 'B-304',
            queryType: 'complaint',
            subject: 'Noisy Neighbors',
            description: 'The students in room B-305 play loud music late at night.',
            date: '2023-07-18',
            status: 'denied',
            comments: [{
                text: 'After investigation, we found no excessive noise during quiet hours.',
                date: '2023-07-20',
                by: 'admin'
            }]
        },
        {
            id: 'QRY1004',
            name: 'Sarah Williams',
            email: 'sarah.williams@gmail.com',
            hostelType: 'girls',
            roomNumber: 'G-112',
            queryType: 'mess',
            subject: 'Food Quality Issue',
            description: 'The food quality in the mess has deteriorated over the past week. Many students are complaining about undercooked rice and stale vegetables.',
            date: '2023-07-22',
            status: 'ongoing',
            comments: [{
                text: 'Mess committee has been informed about the issue. Will conduct an inspection.',
                date: '2023-07-23',
                by: 'admin'
            }]
        }
    ];
    
    // Admin credentials (In a real application, this would be securely stored)
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };
    
    // Navigation Functions
    function showSection(section) {
        // Hide all sections
        homeSection.classList.remove('active-section');
        homeSection.classList.add('hidden-section');
        submitQuerySection.classList.remove('active-section');
        submitQuerySection.classList.add('hidden-section');
        trackQuerySection.classList.remove('active-section');
        trackQuerySection.classList.add('hidden-section');
        adminPortalSection.classList.remove('active-section');
        adminPortalSection.classList.add('hidden-section');
        
        // Remove active class from all nav links
        homeLink.classList.remove('active');
        submitQueryLink.classList.remove('active');
        trackQueryLink.classList.remove('active');
        adminLink.classList.remove('active');
        
        // Show the selected section and highlight the nav link
        if (section === 'home') {
            homeSection.classList.remove('hidden-section');
            homeSection.classList.add('active-section');
            homeLink.classList.add('active');
        } else if (section === 'submit-query') {
            submitQuerySection.classList.remove('hidden-section');
            submitQuerySection.classList.add('active-section');
            submitQueryLink.classList.add('active');
        } else if (section === 'track-query') {
            trackQuerySection.classList.remove('hidden-section');
            trackQuerySection.classList.add('active-section');
            trackQueryLink.classList.add('active');
        } else if (section === 'admin-portal') {
            adminPortalSection.classList.remove('hidden-section');
            adminPortalSection.classList.add('active-section');
            adminLink.classList.add('active');
        }
    }
    
    // Event Listeners for Navigation
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('home');
    });
    
    submitQueryLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('submit-query');
    });
    
    trackQueryLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('track-query');
    });
    
    adminLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('admin-portal');
    });
    
    newQueryBtn.addEventListener('click', function() {
        showSection('submit-query');
    });
    
    checkStatusBtn.addEventListener('click', function() {
        showSection('track-query');
    });
    
    // Form Submission Handlers
    queryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const hostelType = document.getElementById('hostel-type').value;
        const roomNumber = document.getElementById('room-number').value;
        const queryType = document.getElementById('query-type').value;
        const subject = document.getElementById('query-subject').value;
        const description = document.getElementById('query-description').value;
        
        // Validate Gmail address
        if (!email.endsWith('@gmail.com')) {
            showNotification('Please enter a valid Gmail address');
            return;
        }
        
        // Validate room number format (simple validation)
        const boysPrefixRegex = /^B-\d{3}$/;
        const girlsPrefixRegex = /^G-\d{3}$/;
        
        if (hostelType === 'boys' && !boysPrefixRegex.test(roomNumber)) {
            showNotification('Boys hostel room number should be in format B-XXX (e.g., B-101)');
            return;
        }
        
        if (hostelType === 'girls' && !girlsPrefixRegex.test(roomNumber)) {
            showNotification('Girls hostel room number should be in format G-XXX (e.g., G-101)');
            return;
        }
        
        // Create a new query object
        const newQuery = {
            id: 'QRY' + (1000 + queries.length + 1),
            name,
            email,
            hostelType,
            roomNumber,
            queryType,
            subject,
            description,
            date: new Date().toISOString().split('T')[0],
            status: 'ongoing',
            comments: []
        };
        
        // Add the new query to the queries array
        queries.push(newQuery);
        
        // Reset the form
        queryForm.reset();
        
        // Show success notification
        showNotification(`Query submitted successfully! Your Query ID is ${newQuery.id}`);
        
        // Update admin dashboard if it's open
        if (adminDashboard.classList.contains('active-admin-section')) {
            updateAdminDashboard();
        }
    });
    
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        
        // Check credentials
        if (username === adminCredentials.username && password === adminCredentials.password) {
            // Show admin dashboard
            adminLogin.classList.remove('active-admin-section');
            adminLogin.classList.add('hidden-admin-section');
            adminDashboard.classList.remove('hidden-admin-section');
            adminDashboard.classList.add('active-admin-section');
            
            // Update dashboard data
            updateAdminDashboard();
        } else {
            showNotification('Invalid username or password');
        }
    });
    
    adminLogoutBtn.addEventListener('click', function() {
        // Show admin login
        adminDashboard.classList.remove('active-admin-section');
        adminDashboard.classList.add('hidden-admin-section');
        adminLogin.classList.remove('hidden-admin-section');
        adminLogin.classList.add('active-admin-section');
        
        // Reset login form
        adminLoginForm.reset();
    });
    
    // Query Tracking Functions
    searchQueryBtn.addEventListener('click', function() {
        const queryId = document.getElementById('query-id').value.trim();
        
        if (!queryId) {
            showNotification('Please enter a Query ID');
            return;
        }
        
        // Find the query
        const query = queries.find(q => q.id === queryId);
        
        if (query) {
            // Show results
            queryResults.classList.remove('hidden');
            displayQueryResults([query]);
        } else {
            showNotification('Query not found');
        }
    });
    
    searchEmailBtn.addEventListener('click', function() {
        const email = document.getElementById('query-email').value.trim();
        
        if (!email) {
            showNotification('Please enter your Gmail address');
            return;
        }
        
        // Find all queries for this email
        const userQueries = queries.filter(q => q.email === email);
        
        if (userQueries.length > 0) {
            // Show results
            queryResults.classList.remove('hidden');
            displayQueryResults(userQueries);
        } else {
            showNotification('No queries found for this email');
        }
    });
    
    function displayQueryResults(queryResults) {
        // Clear previous results
        queryList.innerHTML = '';
        
        // Display each query
        queryResults.forEach(query => {
            const queryItem = document.createElement('div');
            queryItem.classList.add('query-item');
            
            // Create status badge
            const statusBadge = document.createElement('span');
            statusBadge.classList.add('status-badge');
            statusBadge.classList.add(`status-${query.status}`);
            statusBadge.textContent = query.status.charAt(0).toUpperCase() + query.status.slice(1);
            
            queryItem.innerHTML = `
                <div class="query-header">
                    <h4>${query.subject}</h4>
                    ${statusBadge.outerHTML}
                </div>
                <div class="query-info">
                    <p><strong>Query ID:</strong> ${query.id}</p>
                    <p><strong>Date:</strong> ${query.date}</p>
                    <p><strong>Room:</strong> ${query.roomNumber}</p>
                </div>
                <button class="btn primary-btn view-query-btn" data-id="${query.id}">View Details</button>
            `;
            
            queryList.appendChild(queryItem);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-query-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const queryId = this.getAttribute('data-id');
                const query = queries.find(q => q.id === queryId);
                
                if (query) {
                    showQueryDetails(query, false); // false means not in admin mode
                }
            });
        });
    }
    
    // Admin Dashboard Functions
    function updateAdminDashboard() {
        // Update statistics
        document.getElementById('total-queries').textContent = queries.length;
        document.getElementById('ongoing-queries').textContent = queries.filter(q => q.status === 'ongoing').length;
        document.getElementById('successful-queries').textContent = queries.filter(q => q.status === 'successful').length;
        document.getElementById('denied-queries').textContent = queries.filter(q => q.status === 'denied').length;
        
        // Update query table
        updateQueryTable('all');
    }
    
    function updateQueryTable(filter) {
        const tableBody = document.querySelector('#admin-queries-table tbody');
        tableBody.innerHTML = '';
        
        // Filter queries based on selected filter
        let filteredQueries = queries;
        if (filter !== 'all') {
            filteredQueries = queries.filter(q => q.status === filter);
        }
        
        // Sort queries by date (newest first)
        filteredQueries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Add each query to the table
        filteredQueries.forEach(query => {
            const row = document.createElement('tr');
            
            // Create status badge
            const statusBadge = document.createElement('span');
            statusBadge.classList.add('status-badge');
            statusBadge.classList.add(`status-${query.status}`);
            statusBadge.textContent = query.status.charAt(0).toUpperCase() + query.status.slice(1);
            
            row.innerHTML = `
                <td>${query.id}</td>
                <td>${query.date}</td>
                <td>${query.name}</td>
                <td>${query.hostelType === 'boys' ? 'Boys' : 'Girls'}</td>
                <td>${query.roomNumber}</td>
                <td>${query.subject}</td>
                <td>${statusBadge.outerHTML}</td>
                <td><button class="action-btn view-btn" data-id="${query.id}">View</button></td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const queryId = this.getAttribute('data-id');
                const query = queries.find(q => q.id === queryId);
                
                if (query) {
                    showQueryDetails(query, true); // true means in admin mode
                }
            });
        });
    }
    
    // Filter buttons event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update query table with selected filter
            const filter = this.getAttribute('data-filter');
            updateQueryTable(filter);
        });
    });
    
    // Modal Functions
    function showQueryDetails(query, isAdmin) {
        // Populate query details
        queryDetailsContent.innerHTML = `
            <div class="detail-item">
                <h4>Query ID</h4>
                <p>${query.id}</p>
            </div>
            <div class="detail-item">
                <h4>Submitted By</h4>
                <p>${query.name} (${query.email})</p>
            </div>
            <div class="detail-item">
                <h4>Hostel & Room</h4>
                <p>${query.hostelType === 'boys' ? 'Boys' : 'Girls'} Hostel, Room ${query.roomNumber}</p>
            </div>
            <div class="detail-item">
                <h4>Query Type</h4>
                <p>${query.queryType.charAt(0).toUpperCase() + query.queryType.slice(1)}</p>
            </div>
            <div class="detail-item">
                <h4>Subject</h4>
                <p>${query.subject}</p>
            </div>
            <div class="detail-item">
                <h4>Description</h4>
                <p>${query.description}</p>
            </div>
            <div class="detail-item">
                <h4>Date Submitted</h4>
                <p>${query.date}</p>
            </div>
            <div class="detail-item">
                <h4>Status</h4>
                <p><span class="status-badge status-${query.status}">${query.status.charAt(0).toUpperCase() + query.status.slice(1)}</span></p>
            </div>
        `;
        
        // Add comments if any
        if (query.comments && query.comments.length > 0) {
            const commentsHtml = `
                <div class="detail-item">
                    <h4>Comments</h4>
                    <div class="comments-list">
                        ${query.comments.map(comment => `
                            <div class="comment">
                                <p>${comment.text}</p>
                                <small>${comment.date}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            queryDetailsContent.innerHTML += commentsHtml;
        }
        
        // Show or hide admin actions
        if (isAdmin) {
            adminActions.classList.remove('hidden');
            
            // Store the query ID for status update
            updateStatusBtn.setAttribute('data-id', query.id);
            
            // Highlight the current status button
            document.querySelectorAll('.status-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-status') === query.status) {
                    btn.classList.add('active');
                }
            });
        } else {
            adminActions.classList.add('hidden');
        }
        
        // Show the modal
        queryModal.style.display = 'block';
    }
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        queryModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === queryModal) {
            queryModal.style.display = 'none';
        }
    });
    
    // Update query status
    updateStatusBtn.addEventListener('click', function() {
        const queryId = this.getAttribute('data-id');
        const query = queries.find(q => q.id === queryId);
        
        if (!query) return;
        
        // Get selected status
        const selectedStatus = document.querySelector('.status-btn.active');
        if (!selectedStatus) {
            showNotification('Please select a status');
            return;
        }
        
        const newStatus = selectedStatus.getAttribute('data-status');
        const comment = document.getElementById('admin-comment').value;
        
        // Update query status
        query.status = newStatus;
        
        // Add comment if provided
        if (comment) {
            query.comments.push({
                text: comment,
                date: new Date().toISOString().split('T')[0],
                by: 'admin'
            });
        }
        
        // Close modal
        queryModal.style.display = 'none';
        
        // Show notification
        showNotification(`Query ${queryId} status updated to ${newStatus}`);
        
        // Update admin dashboard
        updateAdminDashboard();
    });
    
    // Status button event listeners
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all status buttons
            document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Notification Function
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Initialize the application
    function init() {
        // Show home section by default
        showSection('home');
    }
    
    // Call init function
    init();
});